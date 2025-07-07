import AuthForm from '@/components/authForm';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const push = jest.fn();
const refresh = jest.fn();

jest.mock('next/navigation', ()=>({
    useRouter: () => ({push, refresh}),
    usePathname: jest.fn()
}))

global.fetch = jest.fn();

describe('Authform - Login', ()=>{
    beforeEach(() => {
        const nextNavigation = require('next/navigation');
        nextNavigation.usePathname.mockReturnValue('/login');

        jest.clearAllMocks();
    });

    it('render login form correctly', () => {
        render(<AuthForm/>);

        expect(screen.getByText(/login/i, {selector: 'h2'})).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i})).toBeInTheDocument();
    });

    it('show option to Sign Up', async () => {
        render(<AuthForm/>);

        expect(screen.getByText(/New User?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Sign Up/i})).toBeInTheDocument();

        userEvent.click(screen.getByRole('button', {name: /Sign Up/i}));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/signUp');
        });
    });

    it('calls login API and navigates to dshboard page on success', async() => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async() => ({message: 'Successfully login'})
        });

        render(<AuthForm/>);

        userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
        userEvent.type(screen.getByLabelText(/password/i), '1234567');
        userEvent.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object));
            expect(push).toHaveBeenCalledWith('/dashboard');
            expect(refresh).toHaveBeenCalled();
        });
    });

    it('show alert on login failure', async() => {
        window.alert = jest.fn();

        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async() => ({message: 'Invalid credentials'})
        });

        render(<AuthForm/>);
        userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
        userEvent.type(screen.getByLabelText(/password/i), '1234567');
        userEvent.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
        });
    });
});

describe('Authform - Signup', ()=>{
    beforeEach(() => {
        const nextNavigation = require('next/navigation');
        nextNavigation.usePathname.mockReturnValue('/signUp');

        jest.clearAllMocks();
    });

    it('render sign up form correctly', () => {
        render(<AuthForm/>);

        expect(screen.getByText(/Sign Up/i, {selector: 'h2'})).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up/i})).toBeInTheDocument();
    });

    it('show option to login', async () => {
        render(<AuthForm/>);

        expect(screen.getByText(/Already has an account?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument();

        userEvent.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/login');
        });
    });

    it('calls SignUp API and navigates to dshboard page on success', async() => {
        window.alert = jest.fn();
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async() => ({message: 'Successfully login'})
        });

        render(<AuthForm/>);

        userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
        userEvent.type(screen.getByLabelText(/password/i), '1234567');
        userEvent.click(screen.getByRole('button', {name: /Sign Up/i}));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/auth/signup', expect.any(Object));
            expect(window.alert).toHaveBeenCalledWith('Signup successfuly! please login');
            expect(push).toHaveBeenCalledWith('/login');
        });
    });

    it('show alert on signUp failure', async() => {
        window.alert = jest.fn();
        
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async() => ({message: 'User already exist'})
        });

        render(<AuthForm/>);
        userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
        userEvent.type(screen.getByLabelText(/password/i), '1234567');
        userEvent.click(screen.getByRole('button', {name: /Sign Up/i}));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('User already exist');
        });
    });
});

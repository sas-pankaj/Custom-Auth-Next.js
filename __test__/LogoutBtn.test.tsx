import { LogoutBtn } from "@/components/LogoutBtn";
import { render, screen,  waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

const push = jest.fn();
const refresh = jest.fn();

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({push, refresh}),
}))

describe('logout btn component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('logout btn is visible', () => {
        render(<LogoutBtn/>);
        
        const logoutBtn = screen.getByRole('button', {name: /logout/i});
        expect(logoutBtn).toBeInTheDocument();
    });

    it('logout api is called and redirected to login page', async () => {
        (fetch as jest.Mock).mockResolvedValue({ message: "Logout successfully" });

        render(<LogoutBtn/>);
        const logoutBtn = screen.getByRole('button', {name: /logout/i});
        userEvent.click(logoutBtn);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/auth/logout', {method: 'POST'});
            expect(push).toHaveBeenCalledWith('/');
            expect(refresh).toHaveBeenCalled();
        })
    });
})

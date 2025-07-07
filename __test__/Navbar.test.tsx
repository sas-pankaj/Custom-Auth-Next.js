import Navbar from "@/components/Navbar";
import { render, screen } from "@testing-library/react";
import { cookies } from "next/headers";

jest.mock('../src/components/LogoutBtn', () => ({
    LogoutBtn: () => <button>Logout</button>
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe('Navbar component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('nabvar is visible with logout btn', async () => {
        (cookies as jest.Mock).mockReturnValue({
            get: () => ({ name: 'auth', value: 'token'}),
        })
        render(await Navbar());

        expect(screen.getByText(/auth user/i)).toBeInTheDocument();
        expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    it('nabvar is visible with no logout btn', async () => {
        (cookies as jest.Mock).mockReturnValue({
            get: () => undefined,
        })
        render(await Navbar());

        expect(screen.getByText(/auth user/i)).toBeInTheDocument();
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    })
});

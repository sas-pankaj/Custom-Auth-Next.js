import { cookies } from "next/headers";
import { getUsers } from "./fileUtils"
import bcrypt from "bcryptjs";

export async function validateUser(user: {email: string, password: string}){
    const users = await getUsers();
    const matchedUser = users.find(usr => usr.email === user.email);

    if (!matchedUser) return undefined;

    const validPassword = await bcrypt.compare(user.password, matchedUser.password)
    return validPassword ? matchedUser: undefined;
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get('auth');
}
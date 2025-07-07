import { cookies } from "next/headers";
import { getUsers } from "./fileUtils"

export async function validateUser(user: {email: string, password: string}){
    const users = await getUsers();
    const validUser = users.find(usr => usr.email === user.email && usr.password === user.password);
    return validUser;
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get('auth');
}
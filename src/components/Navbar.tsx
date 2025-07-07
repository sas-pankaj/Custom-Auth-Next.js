import { cookies } from "next/headers";
import React from "react";
import { LogoutBtn } from "./LogoutBtn";

export default async function Navbar() {
  const cookie = await cookies();
  const userIsLogin = !!cookie.get("auth");
  
  return (
    <nav className="w-full bg-gray-400">
      <div className="px-8 py-4 flex justify-between items-center">
        <h1>Auth User</h1>
        {userIsLogin && (
          <div className="flex justify-between gap-2 items-center">
            <LogoutBtn />
          </div>
        )}
      </div>
    </nav>
  );
}

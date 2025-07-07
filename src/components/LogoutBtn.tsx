"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const LogoutBtn = () => {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', {method: 'POST'});
    router.push('/');
    router.refresh();
  }
  return (
    <button
      className="border-2 rounded-2xl outline-0 px-6 py-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

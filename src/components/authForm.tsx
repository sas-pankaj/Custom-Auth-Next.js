"use client";
import { usePathname, useRouter,  } from "next/navigation";
import React from "react";

type IUser = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
}

export default function AuthForm() {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname.includes('login');

  async function handleAuthForm(formdata: FormData) {
    const user: IUser = {
      email: formdata.get('email'),
      password: formdata.get('password')
    }
    
    const url = isLogin? '/api/auth/login': '/api/auth/signup';

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({email: user.email, password: user.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await res.json();
    
    if (!res.ok) {
      alert(result.message);
      return;
    }

    if (isLogin) {
      router.push('/dashboard');
      router.refresh();
    } else {
      alert('Signup successfuly! please login');
      router.push('/login');
    }
  }

  return (
    <div className="flex flex-col gap-6 border-2 border-gray-400 bg-gray-400/80 rounded-2xl p-8">
      <form className="flex flex-col gap-6" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleAuthForm(formData);
        }}>
        <h2 className="text-center text-2xl">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-white"
            />
          </div>
        </div>
        <div className="w-full">
          <button type="submit" className="w-full border-2 rounded-2xl cursor-pointer">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
      {isLogin ? (
        <p className="text-center">
          New User?{" "}
          <button
            className="underline cursor-pointer"
            onClick={() => router.push('/signUp')}
          >
            Sign Up
          </button>
        </p>
      ) : (
        <p className="text-center">
          Already has an account?{" "}
          <button
            className="underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
}

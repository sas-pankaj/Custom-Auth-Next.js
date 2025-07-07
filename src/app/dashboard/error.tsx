"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

 // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(()=>{
      router.refresh();
      reset();
    })
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reload()
        }
        className="border-2 rounded-2xl p-2 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
"use client";
import ThemeToggle from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="w-100 flex gap-x-5 justify-end">
        <UserButton />
        <ThemeToggle />
      </div>
      <div className="h-screen w-full flex items-center justify-center">
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </div>
  );
}

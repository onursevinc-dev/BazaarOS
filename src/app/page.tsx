"use client";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div className="w-100 flex gap-x-5 justify-end">
        <ThemeToggle />
      </div>
      <p className="font-barlow">Barlowsuz</p>
      <p className="font-barlow">Barlowlu</p>
      <Button>Button</Button>
    </div>
  );
}

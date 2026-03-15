import Image from "next/image";
import { ThemeButton } from "@/components/challenges/7.theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to React Coding Challenges!</h1>
      <ThemeButton />
      <p className="mt-4 text-lg text-gray-600">
        Explore various React coding challenges and improve your skills.
      </p>
    </div>
  );
}

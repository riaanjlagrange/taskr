import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  // get current user from clerk
  const user = await currentUser();

  // greeting based on auth state
  const greeting = () => {
    if (user) return (
      <Link href="/projects">
	<Button variant="outline">View my Projects</Button>
      </Link>
    )
    return <p>Please sign in to start</p>
  }

  // else if user is signed in, show this
  return (
    <main className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className="text-2xl">
	Welcome to Taskr
      </h1>
      <p className="mb-5">Your personal task manager :)</p>
      {greeting()}
    </main>
  );
}

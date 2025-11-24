import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  // get current user from clerk
  const user = await currentUser();

  // greeting based on auth state
  const greeting = () => {
    if (user) return (
      <div className="flex gap-2">
	<Link href="/projects/new">
	  <Button>Create Project</Button>
	</Link>
	<Link href="/projects">
	  <Button variant="secondary">View Projects</Button>
	</Link>
      </div>
    )
    return <p>Please sign in to start</p>
  }

  // else if user is signed in, show this
  return (
    <main className="lg:max-w-[50vw] md:max-w-[65vw] max-w-[80vw] mx-auto pt-8">
      <section className="w-full flex flex-col items-center justify-center">
	<h1 className="text-2xl">
	  Welcome to <span className="text-indigo-300 font-bold">Taskr</span>
	</h1>
	<p className="mb-5">Your personal project & issue tracker</p>
	{greeting()}
      </section>
    </main>
  );
}

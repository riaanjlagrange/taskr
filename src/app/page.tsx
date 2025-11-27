import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

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
    return (
      <div className="flex gap-2">
	<SignInButton>
	  <Button variant="secondary">
	    Sign In
	  </Button>
	</SignInButton>
	<SignUpButton>
	  <Button>
	    Sign Up
	  </Button>
	</SignUpButton>
      </div>
    );
  }

  // else if user is signed in, show this
  return (
    <main className="lg:max-w-[80vw] md:max-w-[90vw] max-w-[95vw] mx-auto pt-8">
      <section className="w-full flex flex-col items-center justify-center">
	{/* hero image */}
	<Image
	  src="/hero.svg"
	  alt="Hero Image"
	  width={300}
	  height={300}
	  className="mb-12"
	/>
	<h1 className="text-2xl">
	  Welcome to <span className="text-indigo-300 font-bold">Taskr</span>
	</h1>
	<p className="mb-5">Your personal project & issue tracker</p>
	{greeting()}
      </section>
    </main>
  );
}

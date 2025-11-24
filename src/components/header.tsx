import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link";

export default async function Header() {
  const user = await currentUser();
  const fullName =
    user?.fullName ??
    (`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress);

  return (
    <header className="flex justify-between items-center p-4 h-16 w-full fixed top-0 bg-zinc-900">
      {/* left side */}
      <div className="flex gap-4 items-center">
	<Link href="/" className="hover:text-indigo-300 font-bold transition">
	  Taskr
	</Link>
      </div>

      {/* right side */}
      <div className="flex gap-4 items-center">
	<SignedOut>
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
	</SignedOut>
	<SignedIn>
	  <span>{fullName}</span>
	  <UserButton />
	</SignedIn>
      </div>
    </header>
  )
}

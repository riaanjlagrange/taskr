import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectCreateBtn() {
  return (
    <Link href={`/projects/new`} className="w-full">
      <Button className="w-full">
	Create Project
      </Button>
    </Link>
  )
}

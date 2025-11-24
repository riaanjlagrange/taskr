import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectCreateBtn() {
  return (
    <Link href={`/projects/new`}>
      <Button>
	Create Project
      </Button>
    </Link>
  )
}

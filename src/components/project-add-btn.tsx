import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectCreateBtn() {
  return (
    <Link href={`/projects/new`}>
      <Button variant="outline">
	Create New Project
      </Button>
    </Link>
  )
}

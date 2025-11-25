import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IssueCreateBtn() {
  return (
    <Link href={`/projects`}>
      <Button>
	Create Issue
      </Button>
    </Link>
  )
}

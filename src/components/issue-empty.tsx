import { IconFolderCode } from "@tabler/icons-react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function IssueEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Issues Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any issues for this project yet. Get started by creating
          your first issue.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}


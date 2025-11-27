"use client";

import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Issue } from "@/type";
import { Button } from "./ui/button";
import { IconTrashFilled } from "@tabler/icons-react";

export default function IssueCard({
  issue,
  onDeleteAction,
  onUpdateStatusAction,
}: {
  issue: Issue,
  onDeleteAction: (id: number) => void,
  onUpdateStatusAction: (id: number, status: string) => void,
}) {
  const { id, title, priority } = issue;

  return (
    <Item variant="outline" className="w-full" key={id}>
      <ItemContent className="truncate">
	<ItemTitle>{title}</ItemTitle>
	<ItemDescription>{priority}</ItemDescription>
      </ItemContent>
      <ItemActions className="shrink-0">
	{issue.status === "open" ? (
	  <Button
	    variant="outline"
	    size="sm"
	    onClick={() => onUpdateStatusAction(id, "closed")}
	  > 
	    Close Issue
	  </Button>
	) : (
	  <Button
	    variant="outline"
	    size="sm"
	    onClick={() => onUpdateStatusAction(id, "open")}
	  > 
	    Re-open issue
	  </Button>
	)}
	<Button
	  variant="outline"
	  size="sm"
	  onClick={() => onDeleteAction(id)}
	> 
	  <IconTrashFilled fill="#883333" />
	</Button>
      </ItemActions>
    </Item>
  )
}

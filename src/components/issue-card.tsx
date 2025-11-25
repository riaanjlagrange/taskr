"use client";

import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Issue } from "@/type";
import { Button } from "./ui/button";
import { IconTrashFilled } from "@tabler/icons-react";

export default function IssueCard({
  issue,
  onDeleteAction,
}: {
  issue: Issue,
  onDeleteAction: (id: number) => void,

}) {
  const { id, title, status, priority, createdAt } = issue;

  return (
    <Item variant="outline" className="w-full" key={id}>
      <ItemContent>
	<ItemTitle>{title}</ItemTitle>
	<ItemDescription>{status}</ItemDescription>
	<ItemDescription>{priority}</ItemDescription>
      </ItemContent>
      <span className="text-zinc-500 text-xs">
	{createdAt}
      </span>
      <ItemActions>
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

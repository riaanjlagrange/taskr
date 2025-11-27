"use client";

import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Project } from "@/type";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";

export default function ProjectCard({
  project,
  onDeleteAction,
}: {
  project: Project,
  onDeleteAction: (id: number) => void,
}) {
  const { id, title, description, createdAt } = project;

  return (
    <Item variant="outline" className="w-full" key={id}>
      <ItemContent>
	<ItemTitle>{title}</ItemTitle>
	<ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <span className="text-zinc-500 text-xs">
	{createdAt}
      </span>
      <ItemActions>
	<Link href={`/project/${id}`}>
	  <Button variant="outline" size="sm">
	    View Project
	  </Button>
	</Link>
	<Link href={`/project/${id}/update`}>
	  <Button variant="outline" size="sm">
	    <IconEdit />
	  </Button>
	</Link>
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

import { redirect } from "next/navigation";
import { getProjects } from "../actions/project/actions"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Project } from "@/type";

export default async function ProjectList() {
  const result = await getProjects();

  if (!result.success) {
    // redirect to login if not authenticated
    if (result.error == "Not authenticated") {
      redirect('https://loved-wasp-54.accounts.dev/sign-in')
    }
    // for other errors, just display the error
    return <div className="flex items-center justify-center">Error: {result.error}</div>
  }

  const projects = result.data;

  return (
    <section className="mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">My Projects</h1>
      
      {projects.length === 0 ? (
	<div className="text-center py-12">
	  <p className="text-zinc-300">No projects yet</p>
	</div>
      ): (
	<ul className="flex flex-col gap-5 items-center justify-center">
	  {projects.map((project: Project) => (
	    <Item variant="outline" key={project.id} className="md:w-[50vw] w-[80vw]">
	      <ItemContent>
		<ItemTitle>{project.title}</ItemTitle>
		<ItemDescription>{project.description}</ItemDescription>
	      </ItemContent>
	      <ItemActions>
		<Link href={`/project/${project.id}`}>
		  <Button variant="outline" size="sm">
		    View Project
		  </Button>
		</Link>
	      </ItemActions>
	    </Item>
	  ))}
	</ul>
      )}
    </section>
    
  )
}

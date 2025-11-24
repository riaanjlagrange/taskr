"use client";

import { useState, useTransition } from "react";
import ProjectCard from "./project-card";
import { Project } from "@/type";
import { deleteProjectById } from "@/actions/project/actions";
import { toast } from "sonner";
import { ProjectViewEmpty } from "./project-view-empty";
import ProjectCreateBtn from "./project-create-btn";

// get initial projects from server
export default function ProjectList({ initialProjects }: { initialProjects: Project[]}) {
  const [isPending, startTransition] = useTransition();
  const [projects, setProjects] = useState(initialProjects || [])

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await deleteProjectById(id);

      // if submission fails, show error in toast
      if (!result.success) {
	toast.error(result.error);
	return;
      }

      // update projects after successful deletion
      setProjects((prev) => prev.filter((p) => p.id !== id))

      // display success toast
      toast.success(result.data.title + " - Project Deleted");
    })
  }


  return (
    <section className="w-full">
      <h1 className="text-xl font-bold mb-4">My Projects</h1>
      
      {/* display this if there are no projects */}
      {projects.length === 0 ? (
	<ProjectViewEmpty />
      ): (
      // otherwise display this
	<div>
	  <ul className="flex flex-col gap-5 items-center justify-center">
	    {projects.map((project) => (
	      <ProjectCard
		key={project.id}
		project={project}
		onDeleteAction={() => handleDelete(project.id)}
		isPending={isPending}
	      />
	    ))}
	  </ul>
	  {/* create new project */}
	  <div className="mt-5 w-full flex justify-center">
	    <ProjectCreateBtn />
	  </div>
	</div>
      )}

    </section>
    
  )
}

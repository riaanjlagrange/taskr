import { getProjects } from "@/src/actions/project/actions"

export default async function Projects() {
  const projects = await getProjects();

  return (
    <ul>
	 {/*      {projects.map((project: Project) => ( */}
	 {/*  <li key={project}> */}
	 {/*    project. */}
	 {/*  </li> */}
	 {/* ))} */}
     </ul>
  )
}

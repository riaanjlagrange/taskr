import { redirect } from "next/navigation";
import { getProjects } from "../actions/project/actions"
import ProjectList from "./project-list";

// load initial projects from server
export default async function ProjectListServer() {
  const result = await getProjects();

  if (!result.success) {
    // redirect to login if not authenticated
    if (result.error == "Not authenticated") {
      redirect('https://loved-wasp-54.accounts.dev/sign-in')
    }
    redirect("/projects/new")
  }

  // return client component for reactive delete
  return <ProjectList initialProjects={result.data} />
}

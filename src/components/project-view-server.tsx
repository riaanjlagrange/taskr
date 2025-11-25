import { getProjectById } from "@/actions/project/actions";
import { redirect } from "next/navigation";
import ProjectView from "./project-view";

export async function ProjectViewServer({ id }: { id: number }) {
  // get project by id from server action
  const result = await getProjectById(id);

  // make id is a valid number
  if (isNaN(id)) {
    return <div>Invalid project ID</div>
  }

  if (!result.success) {
    // redirect to login if not authenticated
    if (result.error == "Not authenticated") {
      redirect('https://loved-wasp-54.accounts.dev/sign-in')
    }
    redirect("/projects")
  }

  return <ProjectView project={result.data} />

}

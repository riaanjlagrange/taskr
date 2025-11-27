import { redirect } from "next/navigation";
import { getProjectById } from "../actions/project/actions"
import ProjectEditForm from "./project-edit-form";

// load initial projects from server
export default async function ProjectEditFormServer({ id }: { id: number }) {

  const result = await getProjectById(id);

  if (!result.success) {
    // redirect to login if not authenticated
    if (result.error == "Not authenticated") {
      redirect('https://loved-wasp-54.accounts.dev/sign-in')
    }
    redirect(`/project/${id}`)
  }

  // return client component for reactive delete
  return <ProjectEditForm initialProject={result.data} />
}

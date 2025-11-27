import ProjectEditFormServer from "@/components/project-edit-form-server";

export default async function ProjectEdit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // get Id from url params /project/id
  // convert id to int / number base 10
  const id  = parseInt((await params).id, 10);

  return (
    <section className="lg:max-w-[80vw] md:max-w-[90vw] max-w-[95vw] mx-auto pt-8">
      <ProjectEditFormServer id={id} />
    </section>
  )
}

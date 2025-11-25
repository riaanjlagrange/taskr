import { ProjectViewServer } from "@/components/project-view-server";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // get Id from url params /project/id
  // convert id to int / number base 10
  const id  = parseInt((await params).id, 10);

  return (
    <section className="lg:max-w-[50vw] md:max-w-[65vw] max-w-[80vw] mx-auto pt-8">
      <ProjectViewServer id={id} />
    </section>
  )
}

import ProjectCreateBtn from "@/components/project-add-btn";
import ProjectList from "@/components/project-list";

export default async function Projects() {
  return (
    <section className="flex flex-col items-center mt-5">
      <ProjectList />
      <ProjectCreateBtn />
    </section>
  );
}

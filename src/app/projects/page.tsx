import ProjectCreateBtn from "@/src/components/project-add-btn";
import ProjectList from "@/src/components/project-list";

export default async function Projects() {
  return (
    <section className="flex flex-col items-center mt-5">
      <ProjectList />
      <ProjectCreateBtn />
    </section>
  );
}

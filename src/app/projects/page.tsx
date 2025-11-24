import ProjectListServer from "@/components/project-list-server";

export default async function Projects() {
  return (
    <section className="lg:max-w-[50vw] md:max-w-[65vw] max-w-[80vw] mx-auto pt-8">
      <ProjectListServer />
    </section>
  );
}

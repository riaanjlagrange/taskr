import ProjectListServer from "@/components/project-list-server";

export default async function Projects() {
  return (
    <section className="lg:max-w-[80vw] md:max-w-[90vw] max-w-[95vw] mx-auto pt-8">
      <ProjectListServer />
    </section>
  );
}

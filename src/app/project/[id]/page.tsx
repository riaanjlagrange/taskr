export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id;

  return (
    <h1>
      ID: {id}
    </h1>
  )
}

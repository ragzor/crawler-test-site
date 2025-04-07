async function getData(id: number) {
  // Simulate slow API for each piece of content
  await new Promise((resolve) => setTimeout(resolve, 1000 * id));

  return {
    id,
    title: `Streamed Content Section ${id}`,
    content: `This content was streamed after a ${id} second delay. Streaming content arrives progressively, challenging crawlers to wait for the full page to load.`,
  };
}

export default async function StreamingContent() {
  // These will be streamed in parallel, with 1, 2, and 3 second delays
  const section1 = await getData(1);
  const section2 = await getData(2);
  const section3 = await getData(3);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-100 rounded">
        <h3 className="font-semibold mb-2">{section1.title}</h3>
        <p>{section1.content}</p>
      </div>

      <div className="p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">{section2.title}</h3>
        <p>{section2.content}</p>
      </div>

      <div className="p-4 bg-red-100 rounded">
        <h3 className="font-semibold mb-2">{section3.title}</h3>
        <p>{section3.content}</p>
      </div>
    </div>
  );
}

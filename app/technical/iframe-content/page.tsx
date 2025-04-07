export default function IframeContent() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">iFrame Content</h2>
      <p className="mb-2">This content is loaded within an iframe.</p>
      <p>
        Crawlers handle iframe content differently, with some indexing this text
        and others ignoring it entirely.
      </p>
      <p className="mt-4 text-sm text-gray-600">
        This critical information might be missed by crawlers that don't process
        iframes.
      </p>
    </div>
  );
}

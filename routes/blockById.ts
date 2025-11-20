export async function blockById(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/'); // /v1/id/blocks/:version/:blockId
  const version = parts[3];
  const blockId = parts[4];

  if (!version || !blockId) {
    return new Response(JSON.stringify({ message: "Version and block ID are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/blocks.json`;
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftBlocks = await response.json();
    const block = minecraftBlocks.find((b: any) => b.id === parseInt(blockId, 10));

    if (!block) {
      return new Response(JSON.stringify({ message: "Block not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(block, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

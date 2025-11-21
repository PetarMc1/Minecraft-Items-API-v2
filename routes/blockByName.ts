export async function blockByName(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const version = segments[3];
  const blockName = segments[4]?.toLowerCase();

  if (!version || !blockName) {
    return new Response(JSON.stringify({ message: "Version and block name are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/${encodeURIComponent(version)}/blocks.json`;

  try {
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftBlocks = await response.json();
    const block = minecraftBlocks.find((b: any) => b.name.toLowerCase() === blockName);

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

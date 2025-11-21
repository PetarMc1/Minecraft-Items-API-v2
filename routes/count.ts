export async function count(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/'); // /v1/count/:version
  const version = parts[3];

  if (!version) {
    return new Response(JSON.stringify({ message: "Version is required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const categories = ['blocks', 'biomes', 'items', 'effects'];
  const counts: Record<string, number> = {};

  try {
    for (const category of categories) {
      const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/${category}.json`;
      const response = await fetch(ghUrl);

      if (response.ok) {
        const data = await response.json();
        counts[category] = data.length;
      } else {
        counts[category] = 0;
      }
    }

    return new Response(JSON.stringify(counts, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

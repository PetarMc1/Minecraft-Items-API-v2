export async function search(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/');
  const version = parts[3];
  const query = parts[4]?.trim().toLowerCase();

  if (!version || !query) {
    return new Response(JSON.stringify({ message: "Version and query are required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const categories = ['blocks', 'biomes', 'items', 'effects'];
  const results: Record<string, any[]> = {};

  try {
    for (const category of categories) {
      const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/${category}.json`;
      const response = await fetch(ghUrl);

      if (!response.ok) {
        results[category] = [];
        continue;
      }

      const data = await response.json();
      results[category] = data.filter((item: any) =>
        item.name.toLowerCase().includes(query)
      );
    }

    return new Response(JSON.stringify(results, null, 2), {
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

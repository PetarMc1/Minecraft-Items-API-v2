export async function map(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/');
  const version = parts[3];
  const category = parts[4]?.trim().toLowerCase();

  const validCategories = ['blocks', 'biomes', 'items', 'effects'];

  if (!version || !category || !validCategories.includes(category)) {
    return new Response(JSON.stringify({
      message: `Invalid version or category. Must be one of: ${validCategories.join(', ')}`
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/${category}.json`;
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const map: Record<string, number> = {};
    for (const item of data) {
      map[item.name] = item.id;
    }

    return new Response(JSON.stringify(map, null, 2), {
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

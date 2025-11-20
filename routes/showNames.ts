export async function showNames(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/'); // /v1/showNames/:category/:version
  const category = parts[3];
  const version = parts[4];

  if (!category || !version) {
    return new Response(JSON.stringify({ message: "Version and category are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const validCategories = ['blocks', 'biomes', 'items', 'effects'];
  if (!validCategories.includes(category)) {
    return new Response(JSON.stringify({ message: `Invalid category. Must be one of: ${validCategories.join(', ')}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/${category}.json`;
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version or category file not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const names = Array.isArray(data) ? data.map((item: any) => item.name) : [];

    return new Response(JSON.stringify(names, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

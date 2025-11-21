export async function biomeByName(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const version = segments[3];
  const biomeName = segments[4]?.toLowerCase();

  if (!version || !biomeName) {
    return new Response(JSON.stringify({ message: "Version and biome name are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/${encodeURIComponent(version)}/biomes.json`;

  try {
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftBiomes = await response.json();
    const biome = minecraftBiomes.find((b: any) => b.name.toLowerCase() === biomeName);

    if (!biome) {
      return new Response(JSON.stringify({ message: "Biome not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(biome, null, 2), {
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

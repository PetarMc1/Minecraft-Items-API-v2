export async function biomeByName(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/'); // /v1/name/biomes/:version/:biomeName
  const version = parts[3];
  const biomeName = parts[4];

  if (!version || !biomeName) {
    return new Response(JSON.stringify({ message: "Version and biome name are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/biomes.json`;
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftBiomes = await response.json();
    const biome = minecraftBiomes.find((b: any) => b.name === biomeName);

    if (!biome) {
      return new Response(JSON.stringify({ message: "Biome name not found" }), {
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
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

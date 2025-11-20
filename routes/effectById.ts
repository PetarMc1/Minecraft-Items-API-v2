export async function effectById(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/'); // /v1/id/effects/:version/:effectId
  const version = parts[3];
  const effectId = parts[4];

  if (!version || !effectId) {
    return new Response(JSON.stringify({ message: "Version and effect ID are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/effects.json`;
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftEffects = await response.json();
    const effect = minecraftEffects.find((e: any) => e.id === parseInt(effectId, 10));

    if (!effect) {
      return new Response(JSON.stringify({ message: "Effect not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(effect, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : "An unknown error occurred",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

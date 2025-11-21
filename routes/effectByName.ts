export async function effectByName(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const version = segments[3];
  const effectName = segments[4]?.toLowerCase();

  if (!version || !effectName) {
    return new Response(JSON.stringify({ message: "Version and effect name are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/${encodeURIComponent(version)}/effects.json`;

  try {
    const response = await fetch(ghUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Version not found on GitHub" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const minecraftEffects = await response.json();
    const effect = minecraftEffects.find((e: any) => e.name.toLowerCase() === effectName);

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
      message: "Server Error",
      error: err instanceof Error ? err.message : "Unknown error",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

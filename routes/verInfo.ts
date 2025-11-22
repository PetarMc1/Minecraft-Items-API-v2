export async function verInfo(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parts = url.pathname.split('/');
  const version = parts[3];

  if (!version) {
    return new Response(JSON.stringify({ message: "Version is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let versionInfo: Record<string, any> = {
      minecraftVersion: version,
      version: 0,
      majorVersion: version,
    };

    try {
      const ghUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/version.json`;
      const response = await fetch(ghUrl);

      if (response.ok) {
        versionInfo = (await response.json()) as Record<string, any>;
      } else {
        return new Response(JSON.stringify({ message: "GitHub version file not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch {
      return new Response(JSON.stringify({ message: "Failed to fetch GitHub version info" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(versionInfo, null, 2), {
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

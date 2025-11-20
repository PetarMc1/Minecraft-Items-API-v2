import {
  verInfo,
  showNames,
  blockByName,
  blockById,
  biomeByName,
  biomeById,
  itemByName,
  itemById,
  effectByName,
  effectById,
} from './routes';

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  try {
    // Versions info
    if (path.startsWith('/v1/verInfo/')) {
      return verInfo(request);
    }

    // Show names
    if (path.startsWith('/v1/showNames/')) {
      return showNames(request);
    }

    // Blocks
    if (path.startsWith('/v1/name/blocks/')) {
      return blockByName(request);
    }
    if (path.startsWith('/v1/id/blocks/')) {
      return blockById(request);
    }

    // Biomes
    if (path.startsWith('/v1/name/biomes/')) {
      return biomeByName(request);
    }
    if (path.startsWith('/v1/id/biomes/')) {
      return biomeById(request);
    }

    // Items
    if (path.startsWith('/v1/name/items/')) {
      return itemByName(request);
    }
    if (path.startsWith('/v1/id/items/')) {
      return itemById(request);
    }

    // Effects
    if (path.startsWith('/v1/name/effects/')) {
      return effectByName(request);
    }
    if (path.startsWith('/v1/id/effects/')) {
      return effectById(request);
    }

    return new Response('Not Found', { status: 404 });
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

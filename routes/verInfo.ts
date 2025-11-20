import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/:version', async (req, res) => {
    const { version } = req.params;

    if (!version) return res.status(400).json({ message: "Version is required" });

    try {
        let versionInfo: Record<string, any> = {
            minecraftVersion: version,
            version: 0,
            majorVersion: version,
        };

        try {
            const url = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/refs/heads/master/data/pc/${version}/version.json`;
            const response = await fetch(url);
            if (response.ok) {
                versionInfo = (await response.json()) as Record<string, any>;
            } else {
                return res.status(404).json({ message: "GitHub version file not found" });
            }
        } catch {
            return res.status(500).json({ message: "Failed to fetch GitHub version info" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(versionInfo);
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});

export default router;

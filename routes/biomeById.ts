import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:biomeId', (req, res) => {
    const { version, biomeId } = req.params;

    if (!version || !biomeId) {
        return res.status(400).json({ message: "Version and biome ID are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/biomes.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftBiomes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const biome = minecraftBiomes.find((b: any) => b.id === parseInt(biomeId, 10));

        if (!biome) {
            return res.status(404).json({ message: "Biome not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(biome, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred"
        });
    }
});

export default router;

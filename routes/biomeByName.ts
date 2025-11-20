import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:biomeName', (req, res) => {
    const { version, biomeName } = req.params;

    if (!version || !biomeName) {
        return res.status(400).json({ message: "Version and biome name are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/biomes.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftBiomes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const biome = minecraftBiomes.find((b: any) => b.name === biomeName);

        if (!biome) {
            return res.status(404).json({ message: "Biome name not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(biome, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;

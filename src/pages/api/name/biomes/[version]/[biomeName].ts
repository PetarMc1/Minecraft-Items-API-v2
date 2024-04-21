import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Biome {
    id: number;
    name: string;
    category: string;
    temperature: number;
    precipitation: string;
    depth: number;
    dimension: string;
    displayName: string;
    color: number;
    rainfall: number;
    child?: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, biomeName } = req.query;

    if (!version || !biomeName) {
        res.status(400).json({ message: "Version and biome name are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'biomes.json');

    if (fs.existsSync(filePath)) {
        try {
            const minecraftBiomes: Biome[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const biome = minecraftBiomes.find((biome: Biome) => biome.name === biomeName);

            if (biome) {
                const prettyerJson = JSON.stringify(biome, null, 2); // Indentation with 2 spaces
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(prettyerJson);
            } else {
                res.status(404).json({ message: "Biome name not found" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Server Error", error: error.message });
            } else {
                res.status(500).json({ message: "Server Error", error: "An unknown error occurred" });
            }
        }
    } else {
        res.status(404).json({ message: "Version not found" });
    }
}

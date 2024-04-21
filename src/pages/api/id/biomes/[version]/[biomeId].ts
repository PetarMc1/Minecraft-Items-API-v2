import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, biomeId } = req.query;

    if (!version || !biomeId) {
        res.status(400).json({ message: "Version and biome ID are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'biomes.json');

    if (fs.existsSync(filePath)) {
        try {
            const minecraftBlocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const biome = minecraftBlocks.find((biome: any) => biome.id === parseInt(biomeId as string, 10));

            if (biome) {
                const prettyJson = JSON.stringify(biome, null, 2); // Indentation with 2 spaces
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(prettyJson);
            } else {
                res.status(404).json({ message: "Biome not found" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Server Error", error: error.message });
            } else {
                res.status(500).json({ message: "Server Error", error: "An unknown error occurred" });
            }
        }
    } else {
        res.status(404).json({ message: "Version not found" })
    }
};
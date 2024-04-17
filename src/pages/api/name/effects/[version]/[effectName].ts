import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Effect {
    id: number;
    name: string;
    displayName: string;
    type: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, effectName } = req.query;

    if (!version || !effectName) {
        res.status(400).json({ message: "Version and effect name are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'effects.json');

    if (fs.existsSync(filePath)) {
        try {
            const minecraftEffects: Effect[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const effect = minecraftEffects.find((effect: Effect) => effect.name === effectName);

            if (effect) {
                const prettyJson = JSON.stringify(effect, null, 2); // Indentation with 2 spaces
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(prettyJson);
            } else {
                res.status(404).json({ message: "Effect not found" });
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

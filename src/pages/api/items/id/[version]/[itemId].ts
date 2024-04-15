import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Item {
    id: number;
    displayName: string;
    name: string;
    stackSize: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, itemId } = req.query;

    if (!version || !itemId) {
        res.status(400).json({ message: "Version and item ID are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'items.json');

    if (fs.existsSync(filePath)) {
        try {
            const minecraftData: Item[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const item = minecraftData.find((item: Item) => item.id.toString() === itemId);

            if (item) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "Item not found" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error", error: "An unknown error occurred" });
            }
        }
    } else {
        res.status(404).json({ message: "Version not found" });
    }
}

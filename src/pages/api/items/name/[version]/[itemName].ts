import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, itemName } = req.query;
    const lowercaseItemName = typeof itemName === 'string' ? itemName.toLowerCase() : '';

    if (!version || !itemName) {
        res.status(400).json({ message: "Version and item name are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `/src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'items.json');

    if (fs.existsSync(filePath)) {
        const minecraftData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const item = minecraftData.find((item: any) => item.name === lowercaseItemName);

        if (item) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(item, null, 2));
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } else {
        res.status(404).json({ message: "Version not found" });
    }
}

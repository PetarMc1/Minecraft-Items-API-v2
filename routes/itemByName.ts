import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:itemName', (req, res) => {
    const { version, itemName } = req.params;
    const lowercaseItemName = itemName.toLowerCase();

    if (!version || !itemName) {
        return res.status(400).json({ message: "Version and item name are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/items.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftItems = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const item = minecraftItems.find((i: any) => i.name.toLowerCase() === lowercaseItemName);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(item, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:category/:version', (req, res) => {
    const { category, version } = req.params;

    if (!version || !category) {
        return res.status(400).json({ message: "Version and category are required" });
    }

    const validCategories = ['blocks', 'biomes', 'items', 'effects'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/${category}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const names = data.map((item: any) => item.name);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(names);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;

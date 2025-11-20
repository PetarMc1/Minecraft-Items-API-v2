import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:blockId', (req, res) => {
    const { version, blockId } = req.params;

    if (!version || !blockId) {
        return res.status(400).json({ message: "Version and block ID are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/blocks.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftBlocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const block = minecraftBlocks.find((b: any) => b.id === parseInt(blockId, 10));

        if (!block) {
            return res.status(404).json({ message: "Block not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(block, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred"
        });
    }
});

export default router;

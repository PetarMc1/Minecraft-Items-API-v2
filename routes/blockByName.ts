import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:blockName', (req, res) => {
    const { version, blockName } = req.params;
    const lowercaseBlockName = blockName.toLowerCase();

    if (!version || !blockName) {
        return res.status(400).json({ message: "Version and block name are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/blocks.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    const minecraftBlocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const block = minecraftBlocks.find((b: any) => b.name.toLowerCase() === lowercaseBlockName);

    if (!block) {
        return res.status(404).json({ message: "Block not found" });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(block, null, 2));
});

export default router;

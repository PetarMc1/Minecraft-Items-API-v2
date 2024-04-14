import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, blockName } = req.query;
    const lowercaseBlockName = typeof blockName === 'string' ? blockName.toLowerCase() : '';

    if (!version || !blockName) {
        res.status(400).json({ message: "Version and block name are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `/src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'blocks.json');

    if (fs.existsSync(filePath)) {
        const minecraftBlocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const block = minecraftBlocks.find((block: any) => block.name === lowercaseBlockName);

        if (block) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(block, null, 2));
        } else {
            res.status(404).json({ message: "Block not found" });
        }
    } else {
        res.status(404).json({ message: "Version not found" });
    }
}

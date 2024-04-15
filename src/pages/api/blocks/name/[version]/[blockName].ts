import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { version, blockId } = req.query;

    if (!version || !blockId) {
        res.status(400).json({ message: "Version and block ID are required" });
        return;
    }

    const versionFolderPath = path.join(process.cwd(), `/src/Data/${version}`);
    const filePath = path.join(versionFolderPath, 'blocks.json');

    if (fs.existsSync(filePath)) {
        try {
            const minecraftBlocks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const block = minecraftBlocks.find((block: any) => block.id === parseInt(blockId as string, 10));

            if (block) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(block, null, 2));
            } else {
                res.status(404).json({ message: "Block not found" });
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

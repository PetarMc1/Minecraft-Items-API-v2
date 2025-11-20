import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:effectId', (req, res) => {
    const { version, effectId } = req.params;

    if (!version || !effectId) {
        return res.status(400).json({ message: "Version and effect ID are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/effects.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftEffects = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const effect = minecraftEffects.find((e: any) => e.id === parseInt(effectId, 10));

        if (!effect) {
            return res.status(404).json({ message: "Effect not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(effect, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred"
        });
    }
});

export default router;

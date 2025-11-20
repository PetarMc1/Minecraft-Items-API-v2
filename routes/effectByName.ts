import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:version/:effectName', (req, res) => {
    const { version, effectName } = req.params;

    if (!version || !effectName) {
        return res.status(400).json({ message: "Version and effect name are required" });
    }

    const filePath = path.join(process.cwd(), `src/Data/${version}/effects.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Version not found" });
    }

    try {
        const minecraftEffects = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const effect = minecraftEffects.find((e: any) => e.name.toLowerCase() === effectName.toLowerCase());

        if (!effect) {
            return res.status(404).json({ message: "Effect not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(effect, null, 2));
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;

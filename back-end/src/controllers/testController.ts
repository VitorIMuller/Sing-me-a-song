import { Request, Response } from "express";
import { prisma } from "../database.js";

async function clearDatabase(req: Request, res: Response) {
    if (process.env.NODE_ENV === "test") {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
    }
    res.sendStatus(200);
}

export default { clearDatabase };
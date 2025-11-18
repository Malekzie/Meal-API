import { PrismaClient } from "../../dist/generated/prisma/client.js";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());

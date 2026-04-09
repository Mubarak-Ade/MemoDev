import "dotenv/config"
import mongoose from "mongoose";
import connectDB from "../db/connectDb";
import { createSlug } from "../utils/slug";
import Project from "../models/Project";

const seedProjectSlugs = async (): Promise<void> => {
    await connectDB();

    const projects = await Project.find({}, { name: 1, slug: 1 }).sort({ createdAt: 1 }).lean();
    const usedSlugs = new Set<string>();
    const operations: any[] = [];

    for (const project of projects) {
        const baseSlug = createSlug(project.name);
        let candidateSlug = baseSlug;
        let suffix = 2;

        while (usedSlugs.has(candidateSlug)) {
            candidateSlug = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        usedSlugs.add(candidateSlug);

        if (project.slug !== candidateSlug) {
            operations.push({
                updateOne: {
                    filter: { _id: project._id },
                    update: { $set: { slug: candidateSlug } },
                },
            });
        }
    }

    if (operations.length > 0) {
        await Project.bulkWrite(operations, { ordered: false });
    }

    console.log(`Backfilled ${operations.length} project slug(s).`);
    await mongoose.disconnect();
};

seedProjectSlugs()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error("Failed to seed project slugs:", error);
        await mongoose.disconnect().catch(() => undefined);
        process.exit(1);
    });

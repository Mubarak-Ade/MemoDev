import "dotenv/config"
import mongoose from "mongoose";
import Snippet from "../models/Snippet";
import connectDB from "../db/connectDb";
import { createSlug } from "../utils/slug";

const seedSnippetSlugs = async (): Promise<void> => {
    await connectDB();

    const snippets = await Snippet.find({}, { title: 1, slug: 1 }).sort({ createdAt: 1 }).lean();
    const usedSlugs = new Set<string>();
    const operations: any[] = [];

    for (const snippet of snippets) {
        const baseSlug = createSlug(snippet.title);
        let candidateSlug = baseSlug;
        let suffix = 2;

        while (usedSlugs.has(candidateSlug)) {
            candidateSlug = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        usedSlugs.add(candidateSlug);

        if (snippet.slug !== candidateSlug) {
            operations.push({
                updateOne: {
                    filter: { _id: snippet._id },
                    update: { $set: { slug: candidateSlug } },
                },
            });
        }
    }

    if (operations.length > 0) {
        await Snippet.bulkWrite(operations, { ordered: false });
    }

    console.log(`Backfilled ${operations.length} snippet slug(s).`);
    await mongoose.disconnect();
};

seedSnippetSlugs()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error("Failed to seed snippet slugs:", error);
        await mongoose.disconnect().catch(() => undefined);
        process.exit(1);
    });

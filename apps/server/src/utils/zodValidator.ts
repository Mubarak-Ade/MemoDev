import createHttpError from "http-errors";
import { ZodType } from "zod";

export const zodParser = <T>(schema: ZodType<T>, data: T) => {
    const parse = schema.safeParse(data)

    if (!parse.success) {
        throw createHttpError(400, parse.error.format())
    }
    return parse.data
}
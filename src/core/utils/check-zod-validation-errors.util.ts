import { ZodError, ZodSchema } from "zod";


function checkZodValidationErrors<T extends object>(target: T, schema: ZodSchema) {
    try {
        schema.parse(target);
        return false;
    } catch(error) {
        if (!(error instanceof ZodError)) return;
        const errors = error.errors.reduce((mapErrors, error) => {
            const propertyName = `${error.path[0]}`;
            mapErrors[propertyName] = `${error.message}`;
            return mapErrors;
        }, {} as { [key: string]: string });
        return errors;
    } 
}

export default checkZodValidationErrors;
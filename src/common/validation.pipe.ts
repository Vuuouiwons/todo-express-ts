import { ZodObject } from "zod"
import { ValidationError } from "../errors/dto";

export interface ValidationInterface {
    validate(validator: ZodObject<any>, data: Object): null;
}

export class ValidationPipe implements ValidationInterface {
    public validate(validator: ZodObject<any>, data: Object): null {
        const result = validator.safeParse(data);

        if (!result.success) {
            throw new ValidationError('failed to validate data');
        }

        return null;
    }
}
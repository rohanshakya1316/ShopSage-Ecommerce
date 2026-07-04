import z, { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);

        next();
    }
    catch (error) {
        if (error instanceof ZodError){

            const formatttedError = z.treeifyError(error);

            res.status(400).send(formatttedError);
        }
        res.status(400).send(error);
    }
}

export default validate;
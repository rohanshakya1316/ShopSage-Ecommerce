import z from "zod";

const validate =(schema)=>(req,res,next)=>{
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if(error instanceof ZodError){
            const formattedError=z.treeifyError(error);
            return res.status(400).send(formattedError);

        }
        res.status(400).send(error.message);
    }
};
export default validate;
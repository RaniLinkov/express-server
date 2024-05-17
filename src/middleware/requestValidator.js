import BadRequestError from "../errors/BadRequestError.js";
import utils from "../utils.js";

const handler = (schema = {}) =>
    (req, res, next) => {
        const {error} = utils.joi.object(schema).validate({
            ...(schema.hasOwnProperty("body") && {body: req.body}),
            ...(schema.hasOwnProperty("params") && {params: req.params}),
            ...(schema.hasOwnProperty("query") && {query: req.query}),
        });

        if (error) {
            throw new BadRequestError(error.message);
        }

        next();
    };

export default handler;

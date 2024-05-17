import NotFoundError from "../errors/NotFoundError.js";

const handler = () => {
    throw new NotFoundError();
}

export default handler;

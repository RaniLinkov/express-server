import {notFoundError} from "../errors/index.js";

const handler = () => {
    throw notFoundError();
}

export default handler;

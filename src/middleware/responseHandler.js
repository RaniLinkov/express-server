const handler = (req, res, next) => {
    res.items = (items = []) =>
        res.json({
            items: Array.isArray(items) ? items : [items],
        });

    res.refreshTokenCookie = (token) =>
        res.cookie("refreshToken", token, {
            maxAge: 3.154e10,
            httpOnly: true,
            secure: true
        });

    return next();
};

export default handler;

import jwt from 'jsonwebtoken';

const sellerMiddleware = async (req, res, next) => {
    const token = req.cookies.sellerToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (decodedToken.email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({ message: "Unauthorized: Invalid seller" });
        }

        req.seller = { email: decodedToken.email };
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Token invalid" });
    }
};

export default sellerMiddleware;

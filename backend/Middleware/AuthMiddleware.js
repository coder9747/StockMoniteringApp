const jwt = require("jsonwebtoken");
const UserModel = require("../Schema/UserSchema.js");
const AuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.private_key);
            const { userId } = payload;

            const isUserExists = await UserModel.findById(userId);
            if (isUserExists) {
                req.user = isUserExists;
                next();
            }
            else {
                res.status(401).json({
                    succes: false,
                    message: "Unauthorized: Invalid token"
                })
            }
        } catch (error) {
            res.status(500).json({
                succes: false,
                message: "Server Error"
            })
        }
    }
    else {
        res.status(401).json({
            succes: false,
            message: "Unauthorized: Invalid token"
        })
    }
}

module.exports = AuthMiddleware;
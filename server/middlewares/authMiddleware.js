import User from "../models/User.js";
import JWT from "jsonwebtoken";
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    }

    catch (err) {
        console.log(err);
        res.json(err);
    }

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized Access"
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
         res.status(401).json({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }


}

export {requireSignIn, isAdmin};
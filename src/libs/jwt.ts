import jwt from "jsonwebtoken";


export const createJWT = (id: string) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "12h",
    });
}
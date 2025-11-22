import jwt from "jsonwebtoken";


export const createJWT = (id: string) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "12h",
    });
}

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        return decoded.id;
    } catch (error) {
        return null;
    }
}
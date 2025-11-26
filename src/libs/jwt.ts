import jwt from "jsonwebtoken";


export const createJWT = (id: string) =>{
    return jwt.sign({ id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, {
        expiresIn: "12h",
    });
}

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as { id: string };
        return decoded.id;
    } catch (error) {
        console.log("JWT verification error:", error);
        return null;
    }
}
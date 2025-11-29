import { verifyJWT } from "@/libs/jwt";

export const validateToken = (token: string | undefined) => {
    if (!token) {
        throw new Error("TOKEN_NOT_PROVIDED");
    }

    const userId = verifyJWT(token);

    if (!userId) {
        throw new Error("TOKEN_INVALID");
    }

    return userId;
};
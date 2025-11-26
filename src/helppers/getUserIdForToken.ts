import { verifyJWT } from "@/libs/jwt";

export const validateToken = (token: string | undefined) => {
    if (!token) {
        throw new Error("TOKEN_NOT_PROVIDED");
    }

    const userId = verifyJWT(token);
    console.log("UserId validateToken:"+userId+" token:"+token)

    if (!userId) {
        throw new Error("TOKEN_INVALID");
    }

    return userId;
};
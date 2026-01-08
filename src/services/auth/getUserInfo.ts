/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { IUser } from "@/types/user.type";

export const getUserInfo = async (): Promise<IUser | any> => {
    let userInfo: IUser | any;
    try {

        const response = await serverFetch.get("/user/me", {
            next: { tags: ["user-info"], revalidate: 180 },

        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(
              accessToken,
              process.env.JWT_ACCESS_SECRET as string
            ) as JwtPayload;

            userInfo = {
                id: verifiedToken.id,
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        // userInfo = {
        //     name: result.data.admin?.name || result.data.doctor?.name || result.data.patient?.name || result.data.name || "Unknown User",
        //     ...result.data
        // };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            email: "",
            role: "",
        };
    }

}
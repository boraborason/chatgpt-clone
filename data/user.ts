import db from "@/db";
import { user } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<User | null> => { // 이메일로 유저를 조회하는 함수, Promise<User | null>로 리턴
  
    try {
        const existngUser = await db.query.user.findFirst({ // db에서 유저를 조회합니다. (1명만 조회)
            where: eq(user.email, email) // 이메일이 일치하는 유저를 찾습니다. 
        });

        if (!existngUser) { // 유저가 존재하지 않으면 null을 반환합니다.
            return null;
        }

        return existngUser; // 유저가 존재하면 해당 유저를 반환합니다.
    }catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("문제가 발생했습니다. ");
    }
  }
import { user } from "@/db/schema";

export type User = typeof user.$inferSelect;  //drizzle에서 제공하는 타입을 사용하여 User 타입 정의

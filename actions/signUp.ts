'use server';

import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { Sign } from "crypto";
import { redirect } from 'next/navigation';

//signUp서버액션
export const signUp = async (_:any, formData: FormData) => { //이전 state를 사용하지 않기 때문에 _로 받음
//1. validate Fields
const validateFields = SignUpSchema.safeParse({  //폼 데이터에서 값을 추출하여 검증합니다.
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
});  

if(!validateFields.success) { //검증에 실패하면 에러를 반환합니다.
    return {
        errorMessage : "잘못된 입력값이 있습니다."
    };
}

//2. 존재하는 사용자인지 체크

const { email, name, password } = validateFields.data; //safeParse로 검증되면 validateFields.data에 값이 들어갑니다.

//4. 성공, 실패처리
try {
    //여기서 쿼리를 할 수 있지만 따로분리해서 사용
const existingUser = await getUserByEmail(email); //이메일로 유저를 조회하는 함수 호출

if (existingUser) { //이미 존재하는 유저라면 에러를 반환합니다.
    return {
        errorMessage: "이미 존재하는 사용자입니다."
    };
}   

//통과 -> 회원가입을 진행. 
//패스워드 암호화
const hashedPassword = await bcrypt.hash(password, 10); //bcrypt를 사용하여 패스워드를 해싱합니다. 10은 해싱 라운드 수입니다.

//3. insert db

await db.insert(user).values({ //drizzle orm을 사용하여 유저를 db에 삽입합니다.
    name,
    email,
    password: hashedPassword, //해싱된 패스워드를 저장합니다.
}); 

} catch (error) {
    console.error("error", error);
    return { errorMessage: "회원가입 중 오류가 발생했습니다." };
}

redirect("/login"); //회원가입 성공 후 로그인 페이지로 리다이렉트합니다.

}


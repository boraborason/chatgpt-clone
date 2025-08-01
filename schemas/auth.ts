//zod는 유효성 검사 라이브러리입니다. 
//회원가입, 로그인에 관한 스키마를 생성

import { z } from "zod";

export const SignUpSchema = z.object({  
  //스키마는 zod의 object 메서드를 사용하여 생성
  //각 필드에 대한 유효성 검사 규칙을 정의합니다.
  //예: 이름은 최소 1자 이상이어야 하고, 문자만 포함해야 합니다.
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." }) // 최소 1자 이상
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {// 한글, 영어 문자만 허용
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "패스워드는 최소 8자 이상이어야 합니다." })
    .regex(/[A-Z]/, {
      message: "패스워드는 최소 1개 이상의 대문자를 포함해야 합니다.",
    })
    .regex(/[a-z]/, {
      message: "패스워드는 최소 1개 이상의 소문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "패스워드는 최소 1개 이상의 숫자를 포함해야 합니다.",
    })
    .regex(/[\W_]/, {
      message: "패스워드는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식을 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "패스워드를 입력해주세요.",
  }),
});
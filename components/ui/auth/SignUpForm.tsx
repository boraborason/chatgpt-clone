'use client' //이벤트 핸들러를 사용하기 위해서는 'client' 컴포넌트로 설정해야함

import { useFormValidate } from "@/hooks/useFormValidate";
import { Input } from "../input";
import { Label } from "../label"; // 여러개 컴포넌트가 있는 폴더에서 특정 컴포넌트만 가져올 때는 중괄호 사용 (정확해야함)
import FormCard from "./FormCard"; // Default export이므로 중괄호 없음
import { Submit } from "./Submit";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { useFormState } from "react-dom";
import { signUp } from "@/actions/signUp"; // 회원가입 액션 함수 가져오기
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function SignUpForm() {
const [errors, action] = useFormState(signUp, undefined); //errors (첫 번째): 서버 액션에서 반환한 상태값 , action (두 번째): 폼에서 사용할 액션 함수
const {error, validateField} = useFormValidate<TSignUpFormError>(SignUpSchema); //useFormValidate 훅을 사용하여 유효성 검사 스키마를 가져옴

//유효성 검사 
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    // 여기서 유효성 검사 로직을 추가할 수 있습니다.
    // 예: 이메일 형식 검사, 비밀번호 강도 검사 등
    validateField(name, value); //useFormValidate 훅에서 정의한 validateField 함수를 호출하여 유효성 검사 수행
}

useEffect(() => {
    if (errors?.errorMessage){
        toast.error(errors.errorMessage); // 서버 액션에서 반환한 에러가 있다면 에러 메시지를 토스트로 표시합니다.
    }
 }, [errors]); 

    return (
        <FormCard
            title={"회원가입"}
            footer={{
                label: "이미 계정이 있으신가요?",
                href: "/login"
            }}
        >   {/* shadcn 폼 기능은 리액트 훅 폼을 사용해서 구현할 예정 */}
            {/* htmlFor을 통해 input아이디와 맵핑 */}
            <form action= {action}className="space-y-10">
                {/* 이름 */}
                <div className="space-y-1">
                    <Label htmlFor="name">이름</Label>
                    <Input
                    id="name"
                    name="name"
                    placeholder="이름을 입력해주세요"    
                    error={!!error?.name}
                    onChange={handleChange}></Input>
                </div>

                {/* 에러를 활용해 ui에서 에러 메세지를 출력합니다. */}
                {error?.name && <FormMessage message={error?.name[0]} />}
                
                {/* 이메일 */}
                <div>
                     <Label htmlFor="email">이메일</Label>
                     <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exam@exam.com"    
                    error={!!error?.email}
                    onChange={handleChange}></Input>
                </div>

                {/* 에러를 활용해 ui에서 에러 메세지를 출력합니다. */}
                {error?.email && <FormMessage message={error?.email[0]} />}

                {/* 비밀번호 */}
                <div>
                     <Label htmlFor="password">비밀번호</Label>
                     <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"    
                    error={!!error?.password}
                    onChange={handleChange}></Input>
                </div>

                {/* 에러를 활용해 ui에서 에러 메세지를 출력합니다. */}
                {error?.password && <FormMessage message={error?.password[0]} />}

                <Submit className="w-full">회원가입</Submit>
            </form>
        </FormCard>
    );
}
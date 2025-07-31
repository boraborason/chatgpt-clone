import { Input } from "../input";
import { Label } from "../label"; // 여러개 컴포넌트가 있는 폴더에서 특정 컴포넌트만 가져올 때는 중괄호 사용 (정확해야함)
import FormCard from "./FormCard"; // Default export이므로 중괄호 없음
import { Submit } from "./Submit";

export default function SignUpForm() {
    return (
        <FormCard
            title={"회원가입"}
            footer={{
                label: "이미 계정이 있으신가요?",
                href: "/login"
            }}
        >   {/* shadcn 폼 기능은 리액트 훅 폼을 사용해서 구현할 예정 */}
            {/* htmlFor을 통해 input아이디와 맵핑 */}
            <form action="" className="space-y-10">
                {/* 이름 */}
                <div className="space-y-1">
                    <Label htmlFor="name">이름</Label>
                    <Input
                    id="name"
                    name="name"
                    placeholder="이름을 입력해주세요"    
                    ></Input>
                </div>
                {/* 이메일 */}
                <div>
                     <Label htmlFor="email">이메일</Label>
                     <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exam@exam.com"    
                    ></Input>
                </div>
                {/* 비밀번호 */}
                <div>
                     <Label htmlFor="password">비밀번호</Label>
                     <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"    
                    ></Input>
                </div>
                <Submit className="w-full">회원가입</Submit>
            </form>
        </FormCard>
    );
}
import { Link } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../card";

//FormCard 컴포넌트가 받을 수 있는 props의 구조와 타입을 명시
type props = {
    title: string;
    footer: { label: string; href: string };
    children: React.ReactNode //카드 내용
}

//공통 마크업
export default function FormCard({ title, footer, children }: props) { //컴포넌트 지정
    return <>

        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                
                    {footer.label}
                
            </CardFooter>
        </Card>

    </>
}
//import { ExternalLink } from "lucide-react"  // 아이콘용
import Link from 'next/link'
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
        <Card className="w-[500px] flex flex-col items-center border " >
            <CardHeader className="flex justify-center">
                <CardTitle className="whitespace-nowrap">{title}</CardTitle>
            </CardHeader>
            <CardContent className="w-[90%] mx-auto text-center">
                {children}
            </CardContent>
            <CardFooter>
                <Link className='text-sm text-sky-700' href={footer.href} >
                    {footer.label}
                </Link>
            </CardFooter>
        </Card>
    </>
}
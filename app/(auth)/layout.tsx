export default function AuthLayout({ //레이아웃 파일은 props로 children을 받아서 리턴이 기본형태
    children,
}:{
    children: React.ReactNode;
}) {
    return(
        <div className="flex items-center justify-center h-full">{children}</div> //가운데 정렬
    );
}
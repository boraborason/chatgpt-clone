//폼 메세지 스타일링

type props = {   //props로 메세지를 받습니다.
    message: string;
}   

export function FormMessage({ message }: props) { 
    return <p className="text-sm text-red-600 ml-1 mt-1">{message}</p>
}
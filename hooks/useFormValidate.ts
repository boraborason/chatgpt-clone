//**React 훅(Hook)**은 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 기능입니다.
//**useFormValidate.ts**는 폼 유효성 검사를 위한 커스텀 훅을 정의하는 파일입니다.
//이 훅은 폼 필드의 값과 에러 메시지를 관리하고, 유효성 검사 로직을 포함합니다.

import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {    //검증할 스키마를 인자로 받습니다. 스키마 타입은 조드 객체입니다. 
  
  const [error, setError] = useState<Partial<T>>(); //form의 에러 메세지를 가져옴
  const validateField = (name: string, value: string) => {

    setError({}); //에러를 초기화합니다.

    const parsedValue = schema.pick({ [name]: true }).safeParse({  //인자로 받은 name을 키로 ture로 넘겨주면 해당 필드만 가져옴. 스키마에서 해당 필드만 추출하여 검증합니다.
      [name]: value,
    });
    if(!parsedValue.success) { //검증에 실패하면 에러를 설정합니다.
        setError({
            ...error,
            ...parsedValue.error.flatten().fieldErrors, //flatten()을 사용하여 각 필드의 이름으로 에러 메세지를 가져올 수 있습니다.
        });
    }
    //console.log("parsedValue", parsedValue);
  };

  return {error, validateField};
}
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!); //환경변수에 넣었던 connection string을 이용해 네온db연결
const db = drizzle({ client: sql });  //네온 클라이언트 객체를 드리즐 함수에 넣어서 드리즐 orm인스턴스를 만들어줌

//const result = await db.execute('select 1'); //이렇게 생성된 인스턴스 메소드를 이용해서 db쿼리 조작가능

export default db;  //db변수를 다른곳에서 사용할 수 있도록 export

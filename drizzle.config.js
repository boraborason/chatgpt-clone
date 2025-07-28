const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: './db/schema.ts',//테이블 선언한 스키마 파일의 경로
  out: './drizzle',//드리즐 킷 명령어를 통해 마이그레이션 파일 생성 시 파일위치 폴더
  dialect: 'postgresql',//사용할 데이터 베이스 종류
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
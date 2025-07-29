import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

//user테이블 정의 user (1)
export const user = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(), //생성날짜
    updatedAt: timestamp('updated_at').defaultNow().notNull(), //수정날짜
});

//user테이블 관계정의 코드 (one to many)
export const userRelations = relations(user, ({ many }) => ({
    conversations: many(conversation), // 복수형으로 수정
}));

//conversation테이블 정의 conversation (many) 
export const conversation = pgTable('conversation', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    userId: uuid('userId')
        .references(() => user.id, {onDelete: "cascade"})
        .notNull(), //외래키 설정
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

//conversation테이블 관계정의 코드
export const conversationRelations = relations(conversation, ({ one, many }) => ({
    author: one(user, {
        fields: [conversation.userId],
        references: [user.id],
    }),
    messages: many(message), // 복수형으로 수정
}));

//메시지 테이블 정의 message (many) 
export const message = pgTable('message', {
    id: uuid('id').defaultRandom().primaryKey(),
    content: text('content'),
    role: text('role').$type<"user" | "assistant">(),
    conversationId: uuid('conversationId')
        .references(() => conversation.id, {onDelete: "cascade"})
        .notNull(), //외래키 설정
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

//메시지 테이블 관계정의 코드
export const messageRelations = relations(message, ({ one }) => ({
    conversation: one(conversation, { // 더 명확한 이름으로 수정
        fields: [message.conversationId],
        references: [conversation.id],
    }),
}));
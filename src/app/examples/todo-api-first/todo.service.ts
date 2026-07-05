import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const TodoService = {
  async getTodos() {
    return db.select().from(todos).orderBy(desc(todos.id));
  },

  async createTodo(text: string) {
    const result = await db.insert(todos).values({ text }).returning();
    return result[0];
  },

  async toggleTodoStatus(id: number, currentStatus: boolean) {
    const result = await db.update(todos)
      .set({ completed: !currentStatus })
      .where(eq(todos.id, id))
      .returning();
    return result[0];
  },

  async deleteTodo(id: number) {
    await db.delete(todos).where(eq(todos.id, id));
  }
};

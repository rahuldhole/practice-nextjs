import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Data Access Layer (Model / Service)
 * In a real enterprise app, this might live in `src/services/todo.service.ts`
 * or `src/features/todos/todo.repository.ts`.
 * This isolates database queries from the UI and Actions.
 */
export const TodoService = {
  async getTodos() {
    return db.select().from(todos).orderBy(desc(todos.id));
  },

  async getTodoById(id: number) {
    const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return result[0];
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

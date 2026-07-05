"use server";

import { revalidatePath } from "next/cache";
import { TodoService } from "./todo.service";

/**
 * Controller Layer (Server Actions)
 * These handle incoming client requests (mutations), validate input, 
 * call the Service/Model layer, and trigger cache revalidations.
 */

export async function addTodo(formData: FormData) {
  const text = formData.get("text");

  // Validation
  if (!text || typeof text !== "string") {
    return { error: "Invalid text" };
  }

  // Call the Model/Service
  await TodoService.createTodo(text);
  
  // Revalidate View
  revalidatePath("/examples/todo-rsc-mvc");
}

export async function toggleTodo(id: number, currentStatus: boolean) {
  await TodoService.toggleTodoStatus(id, currentStatus);
  revalidatePath("/examples/todo-rsc-mvc");
}

export async function deleteTodo(id: number) {
  await TodoService.deleteTodo(id);
  revalidatePath("/examples/todo-rsc-mvc");
}

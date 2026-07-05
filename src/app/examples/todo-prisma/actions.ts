'use server';

import { revalidatePath } from 'next/cache';
import { TodoService } from './todo.service';

export async function createTodo(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text || text.trim() === '') return;

  await TodoService.createTodo(text);

  revalidatePath('/examples/todo-prisma');
}

export async function toggleTodo(id: string, completed: boolean) {
  await TodoService.toggleTodoStatus(id, completed);

  revalidatePath('/examples/todo-prisma');
}

export async function deleteTodo(id: string) {
  await TodoService.deleteTodo(id);

  revalidatePath('/examples/todo-prisma');
}

import prisma from '@/lib/prisma';

/**
 * Data Access Layer (Model / Service)
 * Isolates Prisma database queries from the UI and Actions.
 */
export const TodoService = {
  async getTodos() {
    return prisma.prismaTodo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async createTodo(text: string) {
    return prisma.prismaTodo.create({
      data: {
        text: text.trim(),
      },
    });
  },

  async toggleTodoStatus(id: string, completed: boolean) {
    return prisma.prismaTodo.update({
      where: { id },
      data: { completed },
    });
  },

  async deleteTodo(id: string) {
    return prisma.prismaTodo.delete({
      where: { id },
    });
  },
};

import { NextResponse } from "next/server";
import { TodoService } from "../../../examples/todo-api-first/todo.service";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const todoId = parseInt(id, 10);
    const body = await request.json();

    if (isNaN(todoId) || typeof body.completed !== "boolean") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Pass the inverted status, since the service flips it!
    // Wait, the service does !currentStatus. So we pass !body.completed. 
    // Actually let's just pass body.completed and let the service flip it, wait no, 
    // the service currently expects `currentStatus` and flips it.
    // So if the client sends `completed: false` (current status), the service makes it true.
    const updatedTodo = await TodoService.toggleTodoStatus(todoId, !body.completed); // actually, let's just make the service set it to the target status.
    
    // To be precise with the existing service which flips the status:
    // If the client sends `completed: true` (meaning it WANTS it to be true, so current is false)
    // Then we should call toggleTodoStatus with currentStatus = false.
    const currentStatus = !body.completed;
    
    const result = await TodoService.toggleTodoStatus(todoId, currentStatus);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const todoId = parseInt(id, 10);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await TodoService.deleteTodo(todoId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

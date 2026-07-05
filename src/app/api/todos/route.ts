import { NextResponse } from "next/server";
import { TodoService } from "../../examples/todo-api-first/todo.service";

export async function GET() {
  try {
    const todos = await TodoService.getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.text || typeof body.text !== "string") {
      return NextResponse.json({ error: "Invalid text" }, { status: 400 });
    }

    const newTodo = await TodoService.createTodo(body.text);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}

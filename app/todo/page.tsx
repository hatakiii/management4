"use client";

import { buttonVariants } from "@/components/ui/button";
import { todo } from "node:test";
import { useState } from "react";

export type TodosType = {
  id: string;
  title: string;
  isDone: boolean;
  isEditing: boolean;
};

const page = () => {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [inputValue, setInputValue] = useState("");

  console.log("todos", todos);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnClick = () => {
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        title: inputValue,
        isDone: false,
        isEditing: false,
      },
    ]);
    setInputValue("");
  };
  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const handleSave = (id: string, newTitle: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, newTitle, isEditing: false } : todo
      )
    );
  };

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <>
      <p>Todo Page</p>
      <div>
        <input
          type="text"
          value={inputValue}
          placeholder="Add todo"
          onChange={handleOnChange}
        />
        <button onClick={handleOnClick}>Add</button>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.isEditing ? (
              <input
                defaultValue={todo.title}
                onBlur={(e) => handleSave(todo.id, e.target.value)}
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            )}

            {!todo.isEditing && (
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            )}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;

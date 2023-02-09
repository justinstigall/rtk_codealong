import { z } from "zod";

export const TodoCategoriesArray = ["Personal", "Work", "Other"] as const;

export const TodoCategoriesSchema = z.enum(TodoCategoriesArray);

export type TodoCategories = z.infer<typeof TodoCategoriesSchema>;

export const TodoItemSchema = z.object({
    id: z.string().length(10),
    title: z.string(),
    notes: z.string(),
    completed: z.boolean(),
    category: TodoCategoriesSchema,
    tags: z.array(z.string()),
}).strict();

export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoListSchema = z.array(TodoItemSchema);

export type TodoList = z.infer<typeof TodoListSchema>;
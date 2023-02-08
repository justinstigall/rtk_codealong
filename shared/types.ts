import { z } from "zod";

export const TodoCategoriesSchema = z.union([
    z.literal("Personal"),
    z.literal("Work"),
]);

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
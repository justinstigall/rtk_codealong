import * as React from 'react';
import { useState } from 'react';
import { TodoCategories, TodoCategoriesArray, TodoItem } from '@bp/shared';
import { useGetTodoListQuery, useUpdateTodoItemMutation, useDeleteTodoItemMutation, useAddTodoItemMutation } from './TodoApi';
import { nanoid } from 'nanoid';

const Todos = () => {
    let [todoInputTitle, setTodoInputTitle] = useState("");
    let [todoInputNotes, setTodoInputNotes] = useState("");
    let [todoInputCategory, setTodoInputCategory] = useState<TodoCategories>("Personal");

    const { data: todoData } = useGetTodoListQuery(null);
    const [addTodoItem] = useAddTodoItemMutation();
    const [updateTodoItem] = useUpdateTodoItemMutation();
    const [deleteTodoItem] = useDeleteTodoItemMutation();

    const toggleComplete = (item: TodoItem) => {
        let temp = { ...item }
        temp.completed ? temp.completed = false : temp.completed = true
        updateTodoItem(temp);
    }

    const removeItem = (item: TodoItem) => {
        deleteTodoItem(item);
    }

    const addItem = () => {
        addTodoItem(
            {
                id: nanoid(10),
                title: todoInputTitle,
                notes: todoInputNotes,
                category: todoInputCategory,
                completed: false,
                tags: []
            }
        )
    }

    return (
        <div id="todolist" className='max-w-full p-8 bg-white rounded-lg shadow-lg'>
            <div className="flex items-center mb-6">
                <div className='grid grid-cols-1'>
                    {todoData?.map(todo =>
                        <div key={todo.id}>
                            <label className="flex items-center h-10 px-2 rounded">
                                <div onClick={() => toggleComplete(todo)}>{todo.completed ? checked_circle : circle}</div>
                                <span className="ml-4 text-sm font-bold">{todo.title}</span>
                                <span className="ml-4 text-sm">{todo.notes}</span>
                                <span className="ml-4 pl-2 pr-2 text-sm rounded-full bg-blue-300">{todo.category}</span>
                                <div>
                                    {todo.tags?.map((t, i) =>
                                        <span key={i} className="ml-4 text-xs pl-2 pr-2 rounded-full bg-slate-400 text-white">{t}</span>
                                    )}
                                </div>
                                <div onClick={() => removeItem(todo)}>💥</div>
                            </label>
                        </div>
                    )}
                </div>
            </div>
            <input type="text" name="todo title" className='bg-slate-200' onChange={(a) => setTodoInputTitle(a.target.value)} />
            <select className='pl-4' onChange={(a) => setTodoInputCategory(a.target.value as TodoCategories)}>
                {TodoCategoriesArray?.map((a, i) => <option key={i} value={a}>{a}</option>)}
            </select>
            <button className='pl-4' type="submit" onClick={(a) => addItem()}>Add</button>
        </div>);
}

const circle = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /></svg>
const checked_circle = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
</svg>

export default Todos;
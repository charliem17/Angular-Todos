import { TodoItem } from 'src/app/todo-item.interface';

export interface Project {
    id: number,
    name: string,
    date: string,
    todoItems: TodoItem[] 
}
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Project } from './project.interface';
import { TodoItem } from 'src/app/todo-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  idCount: number = 0;
  projects: Project[] = [];

  currentOpenProject: Project;
  observableOpenProject: Subject<Project>; // Todos display listens to this value

  constructor() { }

  getProjects(): Observable<Project[]> {

    // Get project keys in local storage
    let currentProjectKeys: string[] = Object.keys(localStorage).filter(value => {
      return value.startsWith('project');
    });
    // Get item belonging to each key
    currentProjectKeys.forEach(key => {
      this.projects.push(JSON.parse(localStorage.getItem(key)));
    });

    // Return projects AND initialize currentOpenProject
    if(this.projects.length > 0) {
      this.currentOpenProject = this.projects[0];
      this.observableOpenProject = new BehaviorSubject<Project>(this.currentOpenProject);
    } else {
      this.observableOpenProject = new Subject<Project>();
    }

    return of(this.projects);
  }

  createProject(projName: string): void {

    let newDate = new Date(Date.now());
    let currentDate = `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`;
    
    let newProject: Project = {
      id: this.projects.length,
      name: projName,
      date: currentDate,
      todoItems: []
    }

    this.projects[this.projects.length] = newProject;
    this.openProject(newProject.id);

    // Add project to local storage
    localStorage.setItem(`project${newProject.id}`, JSON.stringify(newProject));

    this.idCount++;
  }

  removeProject(id: number): void {
    let index = this.projects.findIndex(element => id == element.id);
    this.projects.splice(index, 1);

    localStorage.removeItem(`project${id}`);

    if(this.projects.length == 0) {
      this.currentOpenProject = null;
      this.observableOpenProject.next(null);
    }
  }

  openProject(id: number): void {
    this.currentOpenProject = this.projects.find(element => id == element.id);

    // Project changed. Notify listeners.
    this.observableOpenProject.next(this.currentOpenProject);
  }

  addTodoToProject(todoItem: TodoItem): void {
    this.currentOpenProject.todoItems[this.currentOpenProject.todoItems.length] = todoItem;

    localStorage.setItem(`project${this.currentOpenProject.id}`, JSON.stringify(this.currentOpenProject));
  }

  removeTodoFromProject(todoItem: TodoItem): void {
    let index: number = this.currentOpenProject.todoItems.findIndex(todo => todoItem == todo);
    this.currentOpenProject.todoItems.splice(index, 1);

    localStorage.setItem(`project${this.currentOpenProject.id}`, JSON.stringify(this.currentOpenProject));
  }

  updateTodoInProject(todoItem: TodoItem): void {
    let index: number = this.currentOpenProject.todoItems.findIndex(todo => todoItem == todo);
    this.currentOpenProject.todoItems[index] = todoItem;

    localStorage.setItem(`project${this.currentOpenProject.id}`, JSON.stringify(this.currentOpenProject));
  }
}

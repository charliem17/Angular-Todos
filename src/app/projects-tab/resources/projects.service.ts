import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Project } from './project.interface';
import { TodoItem } from 'src/app/todo-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  idCount: number = 0;
  projects: Project[] = [
    {
      id: this.idCount,
      name: 'Project 1',
      date: '03/30/02',
      complete: false,
      todoItems: [
          {
            title: 'Title',
            description: 'Description',
            complete: false
          }
      ]
    }
  ];

  currentOpenProject: Project;
  observableOpenProject: Subject<Project>; // Completed-section and Uncompleted-section listen to this value

  constructor() { }

  getProjects(): Observable<Project[]> {

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
    let currentDate = `${newDate.getMonth()}/${newDate.getDay()}/${newDate.getFullYear()}`;

    let newProject: Project = {
      id: this.projects.length,
      name: projName,
      date: currentDate,
      complete: false,
      todoItems: [
        {
          title: 'Title',
          description: 'Description',
          complete: false
        }
      ]
    }

    this.projects[this.projects.length] = newProject;
    this.idCount++;
  }

  removeProject(id: number): void {
    let index = this.projects.findIndex(element => id == element.id);
    this.projects.splice(index, 1);
  }

  openProject(id: number): void {
    this.currentOpenProject = this.projects.find(element => id == element.id);

    // Project changed. Notify listeners.
    this.observableOpenProject.next(this.currentOpenProject);
  }
}

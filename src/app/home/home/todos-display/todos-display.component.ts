import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/projects-tab/resources/project.interface';
import { ProjectsService } from 'src/app/projects-tab/resources/projects.service';
import { ConfirmationService } from 'src/app/confirmation/confirmation.service';
import { TodoItem } from 'src/app/todo-item.interface';

@Component({
  selector: 'app-todos-display',
  templateUrl: './todos-display.component.html',
  styleUrls: ['./todos-display.component.less']
})
export class TodosDisplayComponent implements OnInit {
  
  titleInput: string = "";
  descriptionInput: string = "";
  currentProject: Project;

  todoUI: HTMLElement;

  showConfirmationUI: boolean = false;

  showCompleted: boolean;
  showTodo: HTMLElement;
  showComplete: HTMLElement;

  constructor(
    private projectService: ProjectsService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.watchCurrentProject();
    this.todoUI = document.querySelector('section.complete .new-todo-ui');
    this.showTodo = document.querySelector('#show-todo');
    this.showComplete = document.querySelector('#show-complete');
    this.toggleShow(false);
  }

  watchCurrentProject(): void {
    this.projectService.observableOpenProject.subscribe(
      project => {
        this.currentProject = project;
      }
    );
  }

  openNewTodoUI(): void {
    // Opens new todo UI
    this.todoUI.classList.toggle('show');
  }

  createNewTodo(): void {

    if(this.titleInput == "" || this.descriptionInput == "") {
      if(this.titleInput == "") {
        this.titleInput = "Please enter a title.";
      } else {
        this.descriptionInput = "Please enter a description.";
      }
      return;
    }

    let todoItem: TodoItem = {
      title: this.titleInput,
      description: this.descriptionInput,
      complete: false
    }

    this.projectService.addTodoToProject(todoItem);

    this.titleInput = "";
    this.descriptionInput = "";
    
    this.closeNewTodoUI();
  }

  closeNewTodoUI(): void {
    this.todoUI.classList.remove('show');
  }

  deleteTodo(todo: TodoItem): void {

    this.showConfirmationUI = true;

    let confirmationListener = this.confirmationService.listener;
    let subscription = confirmationListener.subscribe(
      (confirmation) => {
        if(confirmation) {
          this.projectService.removeTodoFromProject(todo);
        }
        this.showConfirmationUI = false;
        subscription.unsubscribe();
      },
    );
  }

  completeTodo(todo: TodoItem): void {
    todo.complete = true;
    this.projectService.updateTodoInProject(todo);
  }

  toggleShow(showComplete: boolean): void {

    this.showCompleted = showComplete;

    if(this.showCompleted) {
      this.showTodo.classList.remove('highlight');
      this.showComplete.classList.add('highlight');
    } else {
      this.showTodo.classList.add('highlight');
      this.showComplete.classList.remove('highlight');
    }
  }
}

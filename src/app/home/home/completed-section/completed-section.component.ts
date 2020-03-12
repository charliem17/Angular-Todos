import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects-tab/resources/projects.service';
import { Project } from 'src/app/projects-tab/resources/project.interface';
import { TodoItem } from 'src/app/todo-item.interface';
import { ConfirmationService } from 'src/app/confirmation/confirmation.service';

@Component({
  selector: 'app-completed-section',
  templateUrl: './completed-section.component.html',
  styleUrls: ['./completed-section.component.less']
})
export class CompletedSectionComponent implements OnInit {

  titleInput: string = "";
  descriptionInput: string = "";
  currentProject: Project;

  todoUI: HTMLElement;

  showConfirmationUI: boolean = false;

  constructor(
    private projectService: ProjectsService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.watchCurrentProject();
    this.todoUI = document.querySelector('section.complete .todo-ui');
  }

  watchCurrentProject(): void {
    this.projectService.observableOpenProject.subscribe(
      project => {
        this.currentProject = project;
      }
    );
  }

  newTodo(): void {
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
}

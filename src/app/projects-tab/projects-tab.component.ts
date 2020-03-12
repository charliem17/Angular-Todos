import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './resources/projects.service';
import { Project } from './resources/project.interface';
import { ConfirmationService } from '../confirmation/confirmation.service';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.less']
})
export class ProjectsTabComponent implements OnInit {

  tab: HTMLElement;
  arrow: HTMLElement;
  projects: Project[];
  openedProject: Project = null;

  projectNameInput: string = "";
  projectCreationUI: HTMLElement;

  showConfirmationUI: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private confirmationService: ConfirmationService
  ){ }

  ngOnInit(): void {
    this.getProjects();
    this.tab = document.querySelector('.project-tab');
    this.arrow = document.querySelector('.project-tab .arrow');
    this.projectCreationUI = document.querySelector('.create-project-ui');
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe(
      (projects) => this.projects = projects,
      error => console.error(`Projects-Tab Component Error: ${error}`)
    );
  }

  toggleTab(arrow: HTMLElement): void {
    this.tab.classList.toggle('open');
    this.arrow.classList.toggle('open');
  }

  openProject(id: number) {
    this.projectsService.openProject(id);
  }

  toggleProjectUI(toggle: boolean): void {
    this.projectCreationUI.classList.toggle('show', toggle);
  }

  createProject(): void {

    if(this.projectNameInput == "") {
      this.projectNameInput = `project${this.projects.length+1}`;
      return;
    }

    this.projectsService.createProject(this.projectNameInput);
    this.projectNameInput = "";
    this.toggleProjectUI(false);
  }

  removeProject(id: number): void {

    this.showConfirmationUI = true;

    let confirmationListener = this.confirmationService.listener;
    let subscription = confirmationListener.subscribe(
      (confirmation) => {
        if(confirmation) {
          this.projectsService.removeProject(id);
        }
        this.showConfirmationUI = false;
        subscription.unsubscribe();
      },
    );
  }

}

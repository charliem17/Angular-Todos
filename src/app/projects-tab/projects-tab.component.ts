import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './resources/projects.service';
import { Project } from './resources/project.interface';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.less']
})
export class ProjectsTabComponent implements OnInit {

  tab: HTMLElement;
  projects: Project[];
  openedProject: Project = null;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
    this.tab = document.querySelector('.tab');
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe(
      (projects) => this.projects = projects,
      error => console.error(`Projects-Tab Component Error: ${error}`)
    );
  }

  toggleTab(): void {
    this.tab.classList.toggle('open');
  }

  openProject(id: number) {
    this.projectsService.openProject(id);
  }

  createProject(name: string): void {
    this.projectsService.createProject(name);
  }

  removeProject(id: number): void {
    this.projectsService.removeProject(id);
  }

}

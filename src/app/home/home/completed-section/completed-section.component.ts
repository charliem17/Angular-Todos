import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects-tab/resources/projects.service';
import { Project } from 'src/app/projects-tab/resources/project.interface';

@Component({
  selector: 'app-completed-section',
  templateUrl: './completed-section.component.html',
  styleUrls: ['./completed-section.component.less']
})
export class CompletedSectionComponent implements OnInit {

  currentProject: Project;

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.watchCurrentProject();
  }

  watchCurrentProject(): void {
    this.projectService.observableOpenProject.subscribe(
      project => {
        this.currentProject = project;
      }
    );
  }

}

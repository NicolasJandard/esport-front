import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-top-teams',
  templateUrl: './top-teams.component.html',
  styleUrls: ['./top-teams.component.css']
})
export class TopTeamsComponent implements OnInit {
  teams;

  constructor(private api: ApiService, private teamsService: TeamsService) { }

  ngOnInit() {
    this.teamsService.getTopTeams().subscribe(response => {
      this.teams = response
    });
  }

}

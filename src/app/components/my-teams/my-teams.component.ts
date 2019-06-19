import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  userTeams : any = [];

  constructor(private teams : TeamsService, private router: Router) { }

  ngOnInit() {
    this.teams.getTeamsByUser(this.user.email).subscribe(response => {
      this.userTeams = response;
    });
  }

  removeTeam(id) {
    this.teams.removeTeam(id).subscribe(response => {
      this.userTeams = response;
    });
  }

}

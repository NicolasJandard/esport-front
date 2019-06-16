import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
  team : any = [];
  comments : any = [];
  user = JSON.parse(localStorage.getItem('user'));
  alreadyCommented : boolean = false;

  constructor(private teamsService: TeamsService, private route : ActivatedRoute, private config: NgbRatingConfig, private router : Router) { 
    config.max = 5;
  }

  ngOnInit() {
    this.teamsService.getDetailsTeam(this.route.snapshot.params.id).subscribe(response => {
      this.team = response
    });
    this.teamsService.getCommentsTeam(this.route.snapshot.params.id).subscribe(response => {
      this.comments = response;
      if(this.user) {
        this.comments.forEach(element => {
          if(element.authorEmail == this.user.email) {
            this.alreadyCommented = true;
          }
        });
      }
    });
  }

  returnTier(tier: String): String {
    switch(tier) {
      case "uber" : return "Ubers";
      case "ou" : return "Over Used";
      case "uu" : return "Under used";
      case "ru" : return "Rarely Used";
      case "nu" : return "Never Used";
      case "no" : return "Others";
      default : return "";
    }
  }

  formSubmit(f) {
    this.teamsService.postComment(f.value, this.user.email, this.route.snapshot.params.id).subscribe(
      onSuccess => {
        this.router.navigate(['/view/' + this.route.snapshot.params.id]);
    });
  }
}

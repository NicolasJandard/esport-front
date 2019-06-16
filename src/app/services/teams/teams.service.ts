import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  apiUrl: any = environment.baseUrl;

  flag: boolean = false;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    return res || {};
  }

  createTeam(data, user, pokeTeamList) {
    let team = this.formValuesAsJSON(data, user, pokeTeamList);
    return this.http.post(this.apiUrl + "/team/create", team);
  }

  getTopTeams() {
    return this.http.get(this.apiUrl + '/team/top').pipe(map(this.extractData));
  }

  getDetailsTeam(team : number) {
    return this.http.get(this.apiUrl + '/team/details/' + team).pipe(map(this.extractData));
  }

  getCommentsTeam(team : number) {
    return this.http.get(this.apiUrl + '/team/comments/' + team).pipe(map(this.extractData));
  }

  postComment(formValues, userEmail, teamId) {
    let comment = this.formCommentAsJSON(formValues, userEmail, teamId);
    return this.http.post(this.apiUrl + "/team/comment", comment);
  }

  private formValuesAsJSON(data, user, pokeTeamList) {
    let team = {
      pokemons : {
        0 : {name : data.pokemon_0, img : pokeTeamList[0].sprites.front_default, passive : data.passive_0, actives : {0 : data.active_0_0, 1 : data.active_0_1, 2 : data.active_0_2, 3 : data.active_0_3}},
        1 : {name : data.pokemon_1, img : pokeTeamList[1].sprites.front_default, passive : data.passive_1, actives : {0 : data.active_1_0, 1 : data.active_1_1, 2 : data.active_1_2, 3 : data.active_1_3}},
        2 : {name : data.pokemon_2, img : pokeTeamList[2].sprites.front_default, passive : data.passive_2, actives : {0 : data.active_2_0, 1 : data.active_2_1, 2 : data.active_2_2, 3 : data.active_2_3}},
        3 : {name : data.pokemon_3, img : pokeTeamList[3].sprites.front_default, passive : data.passive_3, actives : {0 : data.active_3_0, 1 : data.active_3_1, 2 : data.active_3_2, 3 : data.active_3_3}},
        4 : {name : data.pokemon_4, img : pokeTeamList[4].sprites.front_default, passive : data.passive_4, actives : {0 : data.active_4_0, 1 : data.active_4_1, 2 : data.active_4_2, 3 : data.active_4_3}},
        5 : {name : data.pokemon_5, img : pokeTeamList[5].sprites.front_default, passive : data.passive_5, actives : {0 : data.active_5_0, 1 : data.active_5_1, 2 : data.active_5_2, 3 : data.active_5_3}},
      },
      comment : data.comment,
      tier : data.tier,
      creator : user.email
    };

    return team;
  }

  private formCommentAsJSON(data, userEmail, teamId) {
    let comment = {
      text : data.comment,
      author : userEmail,
      rate : data.rating,
      teamId : teamId
    }
    return comment;
  }
}

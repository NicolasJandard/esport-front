import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  pokemonList = [];
  pokemonTeamList = [];
  maxSizeTeam = Array(6).fill(0).map((x,i)=>i);
  maxSizeMove = Array(4).fill(0).map((x,i)=>i);
  user: JSON;
  flag: number;

  constructor(private api: ApiService, private teams: TeamsService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.api.getAllPokemons().subscribe(response => {
      let responseList = response.results;
      for(let i = 0; i < responseList.length; i++) {
        let pokemon = responseList[i]
        this.pokemonList.push({
          name : pokemon.name
        });
      }
    });
  }

  updatePokemon(name, id) {
    this.api.getPokemon(name).subscribe(response => {
      this.pokemonTeamList[id] = response;
    });
  }

  formSubmit(f) {
    console.log(f.value);
    this.teams.createTeam(f.value, this.user, this.pokemonTeamList).subscribe(
      onSuccess => {
        this.router.navigate(['']);
      },
      onFail => {
        this.flag = 500;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})

export class PokedexComponent implements OnInit {
  static readonly MAX_POKEMON = 964;
  static readonly NUMBER_PER_PAGES = 20;
  static readonly LAST_PAGE = 943;

  previous: any;
  next: any;
  pokedexId: any;
  pokemon : any;
  pokemons: any = [];

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadPage();
  }

  openModal(content, pokemon) {
    this.pokemon = pokemon;
    this.modalService.open(content);
  }

  formSubmit(f) {
    this.pokemons = [];
    this.api.getPokemon(f.value.pokemon).subscribe(pokemon => {
      this.pokemons.push({
        object: pokemon,
        num_pokedex: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: this.extractTypes(pokemon.types)
      });
    });
  }

  resetPokedex() {
    this.loadPage();
  }

  private extractTypes(types) {
    var extracted = [];
    for(let i = 0; i < types.length; i++) {
      extracted[i] = types[i].type.name;
    }
    return extracted;
  }

  loadPage(offset: number = 0) {
    this.pokemons = [];
    this.setPages(offset);
    this.api.loadPokedexPage(offset).subscribe(responseList => {
      for(let i = 0; i < responseList.length; i++) {
        let pokemon = responseList[i].pokemon
        this.pokemons.push({
          object: pokemon,
          num_pokedex: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          types: this.extractTypes(pokemon.types)
        });
      }
    });
  }

  private setPages(offset: number) {
    if(offset == 0) {
      this.previous = null;
      this.next = offset + PokedexComponent.NUMBER_PER_PAGES;
    }
    else if(offset > PokedexComponent.LAST_PAGE) {
      this.previous = offset - PokedexComponent.NUMBER_PER_PAGES;
      this.next = offset + (PokedexComponent.MAX_POKEMON - offset);
    }
    else {
      this.previous = offset - PokedexComponent.NUMBER_PER_PAGES;
      this.next = offset + PokedexComponent.NUMBER_PER_PAGES;
    }
  }
}

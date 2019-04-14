import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin} from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrlPokemon: string = 'https://pokeapi.co/api/v2/';
  cache: Array<any>;
  private currentSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    return res || {};
  }

  private getRequest(url) {
    return this.http.get(url).pipe(map(this.extractData));
  }

  /**
   * Méthodes du pokédex
   */

  getPokemonPage(offset: number = 0): Observable<any> {
    let url = this.apiUrlPokemon + "pokemon?offset=" + offset + "&limit=20";
    return this.getRequest(url);
  }

  getPokemonByUrl(url): Observable<any> {
    return this.getRequest(url);
  }

  getPokemon(id: any): Observable<any> {
    //id ou nom
    let url = this.apiUrlPokemon + "pokemon/" + id;
    return this.getRequest(url);
  }

  loadPokedexPage(offset: number = 0) {
    return this.getPokemonPage(offset).pipe(switchMap(response => {
      var results = response.results;
      const obs = results.map(results => this.getPokemonByUrl(results.url));
      return forkJoin(obs).pipe(map(pokemons =>
        pokemons.map((pokemon, i) => {
          return { ...results[i], pokemon: pokemon }
         })
       ))
     }));
  }

  /**
   * Méthodes des compétences
   */

   getAbilitiesPage(offset: number = 0): Observable<any> {
     let url = this.apiUrlPokemon + "move?offset=" + offset + "&limit=20";
     return this.getRequest(url);
   }

   getAbilityByUrl(url): Observable<any> {
     return this.getRequest(url);
   }

   getAbility(id: any): Observable<any> {
     //id ou nom
     let url = this.apiUrlPokemon + "move/" + id;
     return this.getRequest(url);
   }

   loadAbilitiesPage(offset: number = 0) {
     return this.getAbilitiesPage(offset).pipe(switchMap(response => {
       var results = response.results;
       const obs = results.map(results => this.getAbilityByUrl(results.url));
       return forkJoin(obs).pipe(map(abilities =>
         abilities.map((ability, i) => {
           return { ...results[i], ability: ability }
          })
        ))
      }));
   }
}

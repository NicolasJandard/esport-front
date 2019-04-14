import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  static readonly MAX_ABILITY = 746;
  static readonly NUMBER_PER_PAGES = 20;
  static readonly LAST_PAGE = 725;

  previous: any;
  next: any;
  ability : any;
  abilities: any = [];

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadPage();
  }

  openModal(content, ability) {
    this.ability = ability;
    this.modalService.open(content);
  }

  formSubmit(f) {
    this.abilities = [];
    this.api.getAbility(f.value.ability).subscribe(ability => {
      this.abilities.push({
        object: ability,
        ability_id: ability.id,
        name: ability.names[2].name,
        effect: ability.effect_entries[0].effect,
        type: ability.type.name
      });
    });
  }

  resetAbilities() {
    this.loadPage();
  }

  loadPage(offset: number = 0) {
    this.abilities = [];
    this.setPages(offset);
    this.api.loadAbilitiesPage(offset).subscribe(responseList => {
      for(let i = 0; i < responseList.length; i++) {
        let ability = responseList[i].ability;
        this.abilities.push({
          object: ability,
          ability_id: ability.id,
          name: ability.names[2].name,
          effect: ability.effect_entries[0].effect,
          type: ability.type.name
        });
      }
    });
  }

  private setPages(offset: number) {
    if(offset == 0) {
      this.previous = null;
      this.next = offset + SkillsComponent.NUMBER_PER_PAGES;
    }
    else if(offset > SkillsComponent.LAST_PAGE) {
      this.previous = offset - SkillsComponent.NUMBER_PER_PAGES;
      this.next = offset + (SkillsComponent.MAX_ABILITY - offset);
    }
    else {
      this.previous = offset - SkillsComponent.NUMBER_PER_PAGES;
      this.next = offset + SkillsComponent.NUMBER_PER_PAGES;
    }
  }
}

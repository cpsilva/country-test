import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '../mock-country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  title = 'countryTest';

  data = COUNTRIES;
  buttons: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit(): void {
    this.data.forEach((elemt) => {
      let coutries = Object.getOwnPropertyNames(elemt);
      let cities = Object.values(elemt);

      let itens = cities.concat(coutries).map(obj => ({ name: obj, selected: false, match: false, error: false }))
      this.buttons = this.buttons.concat(itens);
    })
  }

  validate(item: any) {

    if (item.selected) return;

    if (this.buttons.every(x => !x.selected)) {
      item.selected = true;
      if (this.buttons.some(x => x.error)) {
        let btns = this.buttons.filter(x => x.error);

        if (btns.length == 0) return;

        btns.forEach(((x) => {
          let idx = this.buttons.findIndex(y => y.name == x.name);
          this.buttons[idx] = { name: x.name, selected: false, match: false, error: false };
        }));
      }
    } else {

      let prevSelected = this.buttons.filter(x => x.selected)[0];

      if (this.data.some(x => x[item.name] == prevSelected.name) || this.data.some(x => x[prevSelected.name] == item.name)) {
        let idx = this.buttons.findIndex(x => x.name == item.name);
        this.buttons[idx] = { name: item.name, selected: false, match: true, error: false };
        let idx2 = this.buttons.findIndex(x => x.name == prevSelected.name);
        this.buttons[idx2] = { name: item.name, selected: false, match: true, error: false };
      } else {
        let idx = this.buttons.findIndex(x => x.name == item.name);
        this.buttons[idx] = { name: item.name, selected: false, match: false, error: true };
        let idx2 = this.buttons.findIndex(x => x.name == prevSelected.name);
        this.buttons[idx2] = { name: prevSelected.name, selected: false, match: false, error: true };
      }
    }
  }

  validateMatchItems() {
    return this.buttons.every(item => item.match);
  }

}

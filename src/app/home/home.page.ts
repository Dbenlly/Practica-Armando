import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  name: string = '';
  gender: string = ''; // "hombre" o "mujer"
  height: number | null = null;
  result: string | null = null;

  constructor() {}

  canSubmit(): boolean {
    return !!this.name && !!this.gender && this.height !== null && !isNaN(this.height) && this.height > 0;
  }

  onSubmit() {
    if (!this.canSubmit()) return;
    this.evaluarEstatura();
  }

  evaluarEstatura() {
    if (this.height === null || !this.gender) return;

    if (this.gender === 'hombre') {
      if (this.height < 163) {
        this.result = 'Bajito';
      } else if (this.height > 175) {
        this.result = 'Alto';
      } else {
        this.result = 'Promedio';
      }
    } else if (this.gender === 'mujer') {
      if (this.height < 150) {
        this.result = 'Bajita';
      } else if (this.height > 170) {
        this.result = 'Alta';
      } else {
        this.result = 'Promedio';
      }
    }
  }
}

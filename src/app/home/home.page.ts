import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  name: string = '';
height: number | null = null; // en cm
result: string | null = null;


// Umbral por defecto (ajústalo si quieres otra regla)
threshold: number = 165;


constructor() {}


canSubmit(): boolean {
return !!this.name && this.height !== null && !isNaN(this.height) && this.height > 0;
}


onSubmit() {
if (!this.canSubmit()) return;
this.evaluarEstatura();
}


evaluarEstatura() {
if (this.height === null) return;


// Regla simple: >= threshold -> alta, < threshold -> bajita
if (this.height >= this.threshold) {
this.result = 'Alta';
} else {
this.result = 'Bajita';
}
}

}

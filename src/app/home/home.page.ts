import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  name: string = '';
  grades: (number | string | null)[] = [null, null, null, null, null, null];
  averageResult: number | null = null;

  constructor() {
  }



  canSubmit(): boolean {
    if (!this.name) {
      return false;
    }

    return this.grades.every(grade => {
      if (grade === null) {
        return false;
      }
      const numericGrade = Number(grade);
      return !isNaN(numericGrade) && numericGrade >= 0;
    });
  }

  onSubmit() {
    if (!this.canSubmit()) return;
    this.calculateAverage();
  }

  calculateAverage() {
    const validGrades = this.grades
      .filter(grade => grade !== null && !isNaN(Number(grade)))
      .map(grade => Number(grade));

    if (validGrades.length === 0) {
      this.averageResult = null;
      return;
    }

    const sum = validGrades.reduce((total, currentGrade) => total + currentGrade, 0);
    this.averageResult = sum / validGrades.length;
  }
}

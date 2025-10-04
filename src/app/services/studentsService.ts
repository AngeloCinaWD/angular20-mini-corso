import { Injectable } from '@angular/core';
import { StudentInterface } from '../interfaces/studentInterface';

@Injectable({
  // il valore root consente l'accesso al service da qualsiasi parte dell'app
  providedIn: 'root',
})
export class StudentsService {
  students: StudentInterface[] = [
    { id: 1, fullname: 'Mario Rossi', rate: 6 },
    { id: 2, fullname: 'Luigi Verdi', rate: 8 },
    { id: 3, fullname: 'Anna Bianchi', rate: 7 },
    { id: 4, fullname: 'Laura Neri', rate: 5 },
  ];

  // students: StudentInterface[] = [];

  // ritorna lo studente col miglior rate, se non ci sono studenti null;
  // il parametro students è di defaul null, se non viene passato prende gli studenti nella proprietà students
  getBest(students: StudentInterface[] | null = null): StudentInterface | null {
    // if (!this.students.length) {
    //   return null;
    // }

    const _students = students ?? this.students;

    if (!_students.length) {
      return null;
    }

    // let best: StudentInterface = this.students[0];
    let best: StudentInterface = _students[0];

    // for (const student of this.students) {
    //   if (student.rate > best.rate) {
    //     best = student;
    //   }
    // }

    for (const student of _students) {
      if (student.rate > best.rate) {
        best = student;
      }
    }

    return best;
  }

  constructor() {}
}

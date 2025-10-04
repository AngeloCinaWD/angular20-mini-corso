import { SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CapitalizePipe } from '../../pipe/capitalize-pipe';
import { StudentsService } from '../../services/studentsService';
import { StudentInterface } from '../../interfaces/studentInterface';

@Component({
  selector: 'app-box2',
  imports: [SlicePipe, UpperCasePipe, CapitalizePipe],
  templateUrl: './box2.html',
  styleUrl: './box2.css',
})
export class Box2 {
  description: WritableSignal<string> = signal(
    'lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  );

  // importo un service o dal costruttore o con il meotodo inject()
  students: StudentsService = inject(StudentsService);

  // lista di studenti come signal
  // gli assegno un valore al caricamento del componente
  studentsList: WritableSignal<StudentInterface[]> = signal([]);

  bestStudent: Signal<StudentInterface | null> = computed(() =>
    this.students.getBest(this.studentsList())
  );

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentsList.set(this.students.students);
  }

  addStudent(): void {
    this.studentsList.update((students: StudentInterface[]) => {
      let newStudent: StudentInterface = {
        id: students.length + 1,
        fullname: `new${students.length + 1} student${students.length + 1}`,
        rate: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
      };

      return [...students, newStudent];
    });
  }
}

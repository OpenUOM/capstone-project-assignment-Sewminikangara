import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  teacherData: any[] = [];
  selected: string = '';

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();  
  }

  // Navigate to the Add Teacher form
  addNewTeacher(): void {
    this.router.navigate(['addTeacher']);
  }

  // Navigate to the Edit Teacher form, passing the teacher's id as state
  editTeacher(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  //  database
  initializeDB(): void {
    this.service.initializeDB().subscribe({
      next: () => {
        console.log('DB is Initialized');
      },
      error: (err) => {
        console.error('ERROR - ', err);
      }
    });
  }

  // Fetch the teacher data from the service
  getTeacherData(): void {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe({
      next: (response) => {
        this.teacherData = Object.keys(response).map((key) => response[key]);
      },
      error: (err) => {
        console.error('ERROR - ', err);
      }
    });
  }

  // Fetch the student data from the service
  getStudentData(): void {
    this.selected = 'Students';
    this.service.getStudentData().subscribe({
      next: (response) => {
        this.teacherData = response;
      },
      error: (err) => {
        console.error('ERROR - ', err);
      }
    });
  }

  // Search for teachers by name in the teacherData array
  search(value: string): void {
    if (value.length === 0) {
      this.getTeacherData();
    } else {
      this.teacherData = this.teacherData.filter(teacher => 
        teacher.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  // Delete a teacher by id
  deleteTeacher(id: number): void {
    this.service.deleteTeacher({ id }).subscribe({
      next: () => {
        this.getTeacherData();  // Refresh teacher data after deletion
      },
      error: (err) => {
        console.error('ERROR - ', err);
      }
    });
  }
}

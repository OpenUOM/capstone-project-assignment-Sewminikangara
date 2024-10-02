import { Component } from '@angular/core';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  studentData: Array<{ name: string; grade: string }> = [
    { name: 'Alice Johnson', grade: 'A' },
    { name: 'Bob Williams', grade: 'B' },
    { name: 'Charlie Brown', grade: 'A' },
    
  ];

  // Original studentData for reset purposes
  originalStudentData: Array<{ name: string; grade: string }> = [...this.studentData];

  search(searchText: string): void {
    // Filter studentData based on the search text
    if (searchText.trim() === '') {
      // If search text is empty, reset the studentData
      this.studentData = [...this.originalStudentData];
    } else {
      this.studentData = this.originalStudentData.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }
}

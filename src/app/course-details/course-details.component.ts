import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../Interfaces/course-interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @Input() currentCourseDetail!: ICourse;

  constructor() { 
    console.log('course detail' + ' ' + this.currentCourseDetail);
  }

  ngOnInit(): void {
  }

}

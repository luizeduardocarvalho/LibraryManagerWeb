import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/models/teacher';
import { UpdateTeacher } from 'src/models/teachers/update-teacher';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss'],
})
export class UpdateTeacherComponent implements OnInit {
  teacherId: number = 0;
  teacher?: Teacher;
  error: boolean = false;
  role: string = 'Teacher';

  createForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  // TODO: Add loader
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teacherId = params['id'];
    });

    this.teacherService
      .getById(this.teacherId)
      .subscribe((teacher: Teacher) => {
        this.teacher = teacher;

        this.createForm = new FormGroup({
          name: new FormControl(this.teacher?.name, Validators.required),
          email: new FormControl(this.teacher?.email, [
            Validators.required,
            Validators.email,
          ]),
        });
      });
  }

  get name() {
    return this.createForm.get('name');
  }

  get email() {
    return this.createForm.get('email');
  }

  selectTeacher(e: any) {
    this.role = e.target.value;
  }

  onSubmit(): void {
    let teacher = this.createForm.value as UpdateTeacher;
    teacher.role = this.role;
    teacher.id = this.teacherId;

    this.teacherService.updateTeacher(teacher).subscribe((res: any) => {
      this.router.navigate(['/teachers']).then(() => {
        this.toastrService.show('Teacher Updated.', 'Success!');
      });
    });
  }

  onClear(): void {
    this.createForm.reset();
  }

  onBack() {
    this.location.back();
  }
}

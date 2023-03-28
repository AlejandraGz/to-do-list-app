import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarea } from 'src/app/models/tareas';
import { TaskComponent } from 'src/app/body/task/task.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  taskForm: FormGroup;
  // id: string | null;
  constructor(private toastr: ToastrService, private router: Router, private tareaService: TaskService, private fb: FormBuilder) {
    this.taskForm =this.fb.group({
      task: ['', Validators.required]
    })
  }

  sendTask() {
    console.log(this.taskForm.value)
    const TAREA: Tarea = {
      task:this.taskForm.get('task')?.value,
    }
    this.tareaService.guardarTarea(TAREA).subscribe(data => {
      this.toastr.success('', 'Tarea agregada!');
      this.router.navigate(['/'])
    }, error => {
      console.log(error);
      this.taskForm.reset();
    })
  }


}
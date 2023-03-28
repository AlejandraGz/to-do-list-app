import { Observable } from 'rxjs';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tarea } from 'src/app/models/tareas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  listTareas: Tarea[] = [];
  pageIndex = 0;
  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
  }
  flag = false;

  cambiarFlag(){
    this.flag = !this.flag;
  }
  constructor(private tareasService: TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.getTareas().subscribe(data => {
      console.log(data);
      this.listTareas = data;
    }, error => {
      console.log(error);
    }
    )

  }
  checkTarea(id: any) {
    this.tareasService.eliminarTareas(id).subscribe(data => {
      this.toastr.info("", "Tarea terminada")
      this.obtenerTareas();
    }, error => {
      console.log(error)
    }
    )
  }


  eliminarTarea(id: any) {
    this.tareasService.eliminarTareas(id).subscribe(data => {
      this.toastr.error("", "Tarea eliminada")
      this.obtenerTareas();
    }, error => {
      console.log(error)
    }
    )
  }
}

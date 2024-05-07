import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../core/interfaces/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    SideNavComponent,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
todoForm!:FormGroup;
tasks:Task[]=[];
inprogress:Task[]=[];
done:Task[]=[];
updatedIndex:any;
isEditeEnabled:boolean=false;
 constructor(private _FormBuilder:FormBuilder){}

 ngOnInit(): void {
   this.todoForm=this._FormBuilder.group({
    item:['',Validators.required]
   })
 }

 addTask(){
  this.tasks.push({
    title:this.todoForm.value.item,
    completed:false
  });
  this.todoForm.reset();
 }

 updateTask(){
  this.tasks[this.updatedIndex].title=this.todoForm.value.item;
  this.tasks[this.updatedIndex].completed=false;
  this.todoForm.reset();
  this.updatedIndex=undefined;
  this.isEditeEnabled=false;
 }
 deleteTask(index:number){
  this.tasks.splice(index,1);
 }
 deleteDoneTask(index:number){
  this.done.splice(index,1);
 }
 deleteInprogressTask(index:number){
   this.inprogress.splice(index,1);
 }
 onEditTask(task:Task,index:number){
   this.todoForm.controls['item'].setValue(task.title);
   this.updatedIndex=index;
   this.isEditeEnabled=true;
 }
 drop(event: CdkDragDrop<Task[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    }
  }
}

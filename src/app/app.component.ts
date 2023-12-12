import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  
  title:string = 'tareas';
  condicion: boolean = true;
  employees = [
    {'name':'Noe',position:'Backend','email':'Zomber@gmail.com'},
    {'name':'Cecilia',position:'Tester','email':'Zomber@gmail.com'},
    {'name':'Karyme',position:'Diseñador','email':'Zomber@gmail.com'}
  ];
  model:any={};
  model2:any={};
  addEmployee():void{
    this.employees.push(this.model)
  }
  deleteEmployee(index:number):void{
    let name = this.employees[index].name
    const Delete = window.confirm(`Estas segur@ de querer eliminar a: ${name}`);
    if(Delete){
      this.employees.splice(index, 1);
    }
  }
  myValue: any;
  editEmployee(index:number):void{
    this.model2.name = this.employees[index].name;
    this.model2.position = this.employees[index].position;
    this.model2.email = this.employees[index].email;
    this.myValue = index;
    if (index < 0) {
      this.condicion = true; // Desactivar el campo si el índice es 0
    } else {
      this.condicion = false; // Activar el campo para otros índices
    }
  }
  updateEmployee():void{
    let i = this.myValue;
    let name = this.employees[i].name
    const Update = window.confirm(`Estas segur@ de querer eliminar a: ${name}`);
    if(Update){
      if(i == undefined){
        alert("Elije un valor de la tabla con el boton Edit")
      }
      for(let j = 0; j < this.employees.length; j++){
        if (i==j){
          this.employees[i] = this.model2;
          this.model2 = {};
        }
      }
      console.log(this.model2)
    }      
//    this.employees.push(this.model(index))
  }
  data: any[] =[];
  constructor(private apiService:ApiService){}

  ngOnInit():void{
    this.llenarData();
  }
  llenarData(){
    this.apiService.getData().subscribe(data=>{
      this.data=data;
      console.log(this.data);
    })
  }
}
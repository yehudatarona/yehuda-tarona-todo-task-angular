import { Component } from '@angular/core';
import { Todo } from "./todo"
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { apiService } from './ApiService'
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoList';
  todovalue: string;
  catvalue: string;
  datevalue: number;
  list: Todo[];
  // list:[];
  // url: string = "http://localhost:3000/todo";
  url: string = "https://tiba-todo-angular.herokuapp.com/todo";

  constructor(private _apiService: apiService) { }

  ngOnInit() {
    this.list = [];
    this.todovalue = "";
    this.catvalue = "";
    this.datevalue = Date.now();
    if (localStorage.getItem("list")) {
      this.list = JSON.parse(localStorage.getItem("list"));

    }

    this._apiService.getData(this.url)
      .subscribe(data => {
        console.log(data)
        this.list = data
      })

  }

  addItem() {

    if (this.todovalue !== "" && this.catvalue !== "") {
      const newItem: Todo = {
        id: Date.now(),
        name: this.todovalue,
        category: this.catvalue

        // value: this.todovalue,
        // cat: this.catvalue,
        // date: this.datevalue,
        // isDone: false
      };
      // this.list.push(newItem);
      // localStorage.setItem("list", JSON.stringify(this.list));


      this._apiService.postData(this.url + "/add", newItem)
        .subscribe(data => {

          console.log(data)
          this.list.push(...data)
        })


    }
    else if (this.todovalue == "" || this.catvalue == "") {
      alert(" All Fields must be filled");

    }

    console.log(this.list);

    this.todovalue = "";
    this.catvalue = "";
    this.datevalue = Date.now();

  }


  deleteItem(id) {
    this._apiService.postData(this.url + "/del", { del: id })
      .subscribe(data => {
        this._apiService.getData(this.url)
          .subscribe(data => {
            console.log(data)
            this.list = data
          })
      })

    // this.list = this.list.filter(item =>
    //   item.id !== id
    // );
    // localStorage.setItem("list", JSON.stringify(this.list));

  }

  // editItem(id: number) {

  //   this.list = this.list.filter(item =>{
  //     if(item.id == id){
  //       this.addItem();

  //     }

  //   });
  //   localStorage.setItem("list", JSON.stringify(this.list));

  // }

  editItem() {

    alert("not completed yet")

    if (this.todovalue !== "" && this.catvalue !== "") {
      const newItem: Todo = {
        id: Date.now(),
        name: this.todovalue,
        category: this.catvalue
      };

      this._apiService.postData(this.url + "/edit", newItem)
        .subscribe(data => {
          this._apiService.getData(this.url)
            .subscribe(data => {
              console.log(data)
              this.list = data
            })

        })


    }
    else if (this.todovalue == "" || this.catvalue == "") {
      alert(" All Fields must be filled");

    }

    console.log(this.list);

    this.todovalue = "";
    this.catvalue = "";
    this.datevalue = Date.now();

  }


  clearAllList() {
    this._apiService.postData(this.url+"/clearAll", {})
      .subscribe(data=>{
        this._apiService.getData(this.url)
        .subscribe(data => {
          console.log(data)
          this.list = data
        })
      })
     
    }

  //   clearAllList() {
  //     alert("clearAllList")
  //     localStorage.removeItem("list");
  //     this.list =[];
  //     // localStorage.clear("list");
  //   }

  // }
}



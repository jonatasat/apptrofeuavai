import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor() { }

  user: any = {
    name: 'Jonatas'
  }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value);
  }

}

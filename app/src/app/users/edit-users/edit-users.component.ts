import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) { 
    console.log(this.route.snapshot.params['id']);
  }

  user: any = {
    name: 'Jonatas'
  }

  ngOnInit() {
  }

  onSubmit(form){
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);
  }

}

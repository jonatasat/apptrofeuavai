import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  user;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    console.log(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.user = this.db.object('users/'+ this.route.snapshot.params['id']).valueChanges();
    console.log(this.user);

    // this.users = this.db.list('users' + this.route.snapshot.params['id']).snapshotChanges().map(actions =>{
    //   return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    // });
    // this.user = this.db.list('users' + this.route.snapshot.params['id']);
    // this.users = this.db.list('users').snapshotChanges().map(items =>{
    //   return items.map(item => {
    //       item.key = this.route.snapshot.params['id'];
    //       return item;
    //   }); 
    // });
  }

  onSubmit(form){
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);
  }

}

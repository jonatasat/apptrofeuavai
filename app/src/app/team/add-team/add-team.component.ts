import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase) { }

  ngOnInit() {
  }

  onSubmit(form){
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);

    this.angularFire.list("teams").push(
      {
        name: form.value.name,
        escudo: form.value.escudo
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);
  }

}

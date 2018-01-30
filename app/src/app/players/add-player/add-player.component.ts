import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase) { }

  ngOnInit() {
  }

  onSubmit(form){
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);

    this.angularFire.list("players").push(
      {
        name: form.value.name,
        position: form.value.position,
        photo: form.value.photo
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);
  }

}

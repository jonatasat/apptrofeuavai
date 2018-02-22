import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.angularFire.list("matches").push(
      {
        team: form.value.team,
        opponent: form.value.opponent,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        average: 0
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

      this.router.navigate(['/matches']);
  }

}

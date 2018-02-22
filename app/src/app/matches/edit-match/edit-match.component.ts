import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  match;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.match = this.db.object('matches/'+ this.route.snapshot.params['id']).valueChanges();
  }

  onSubmit(form){
    this.db.database.ref('matches/'+ this.route.snapshot.params['id']).set({
      team: form.value.team,
      opponent: form.value.opponent,
      score: form.value.score,
      stadium: form.value.stadium,
      championship: form.value.championship,
      round: form.value.round,
      average: form.value.average,
    });

    this.router.navigate(['/matches']);

  }

}

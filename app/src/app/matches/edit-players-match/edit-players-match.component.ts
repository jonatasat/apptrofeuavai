import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';


@Component({
  selector: 'app-edit-players-match',
  templateUrl: './edit-players-match.component.html',
  styleUrls: ['./edit-players-match.component.css']
})
export class EditPlayersMatchComponent implements OnInit {

  match: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.match = this.db.object('matches/'+ this.route.snapshot.params['id']).valueChanges();
  }

  onSubmit(form){

  }

}

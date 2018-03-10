import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { PaginationService } from '../pagination.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private paginationService: PaginationService, private firebase: FirebaseApp) { }

  players: any;
  substitutes: any;
  errData: any;
  average: any;
  score: any;
  opponent: any;
  team: any;
  championship: any;
  date: any;
  round: any;
  storageRef: any;
  matches: any;
  match: any;
  matchesList: any[] = [];
  showAverage=false;
  matchesPlayers: any[] = [];
  sumGrades: any = 0;
  

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.matches = this.db.list('matches').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  onSubmit(form){
    let id = form.value.match.key;

    this.storageRef = this.firebase.storage().ref();

    this.players = this.db.list('matches/'+id+'/players/').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.substitutes = this.db.list('matches/'+id+'/substitutes/').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.firebase.database().ref("matches/" + id).once('value', data => this.getMatch(data), this.errData);

    this.firebase.database().ref("matches/" + id +'/players/').once('value', data => this.getPlayers(data), this.errData);

    
    this.showAverage=true;
  }

  getMatch(data){
    this.average = data.val().average;
    this.opponent = data.val().opponent;
    this.team = data.val().team;
    this.score = data.val().score;
    this.championship = data.val().championship;
    this.round = data.val().round;
    this.date = data.val().date.split('-')[2] + '/' + data.val().date.split('-')[1] + '/' + data.val().date.split('-')[0];
  }

  getPlayers(data){
    Object.values(data.val()).forEach(this.logelements);
  }

  logelements(element){
    return Number(element.grade);
  }

}

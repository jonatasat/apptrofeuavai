import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { PaginationService } from '../../pagination.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';


@Component({
  selector: 'app-edit-players-match',
  templateUrl: './edit-players-match.component.html',
  styleUrls: ['./edit-players-match.component.css']
})
export class EditPlayersMatchComponent implements OnInit {

  match: any;
  showPlayer: any = null;
  showReferee: any = null;
  showCoach: any = null;
  players: Observable<any[]>;
  coaches: Observable<any[]>;
  referees: Observable<any[]>;
  playersMatch: Observable<any[]>;
  coachesMatch: Observable<any[]>;
  refereesMatch: Observable<any[]>;
  substitutesMatch: Observable<any[]>;
  storageRef: any;
  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];
  matchAverage: any = null;
  snapMatch: any;
  newGrade: any;
  

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private paginationService: PaginationService, private firebase: FirebaseApp) {
    console.log(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.match = this.db.object('matches/' + this.route.snapshot.params['id']).valueChanges();

    this.storageRef = this.firebase.storage().ref();
    this.players = this.db.list('players').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.storageRef = this.firebase.storage().ref();
    this.coaches = this.db.list('coaches').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.storageRef = this.firebase.storage().ref();
    this.referees = this.db.list('referees').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.storageRef = this.firebase.storage().ref();
    this.playersMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/players').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.storageRef = this.firebase.storage().ref();
    this.coachesMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/coaches').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.storageRef = this.firebase.storage().ref();
    this.refereesMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/referees').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.storageRef = this.firebase.storage().ref();
    this.substitutesMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/substitutes').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.allItems.push(this.playersMatch);
    this.allItems.push(this.coachesMatch);
    this.allItems.push(this.refereesMatch);
    this.allItems.push(this.substitutesMatch);
    this.setPage(1);
  }

  onSubmit(form) {

    if (this.showPlayer == true) {
      if (form.value.substitute == true) {
        this.storeSubstitute(form);
      } else {
        this.storePlayer(form);
      }
    } else if (this.showCoach == true) {
      this.storeCoach(form);
    } else if (this.showReferee == true) {
      this.storeReferee(form);
    }


  }

  updateMatch(form) {
    this.newGrade = form.value.grade;
    this.firebase.database().ref("matches/" + this.route.snapshot.params['id']).once('value', data => this.updateAvg(data, this.newGrade, this.route.snapshot.params['id']), this.errData);
  }

  updateAvg(data, newGrade, id) {
    var sumGrade = parseFloat(data.val().average) + parseFloat(newGrade);
    this.firebase.database().ref("matches/" + id).update({
      average: sumGrade
    })

  }


  errData(data) {
    console.log('Erro na atualização dos dados: ' + data);
  }


  storePlayer(form) {
    let nome = form.value.player.name;
    let posicao = form.value.player.position;
    let nomeFile = form.value.player.fileName;
    let url = form.value.player.photo;
    let nota = form.value.grade;
    let key = form.value.player.key;

    this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/players/' + key).set({
      name: nome,
      position: posicao,
      photo: url,
      fileName: nomeFile,
      grade: nota
    });

    this.updateMatch(form);

  }

  storeSubstitute(form) {
    let nome = form.value.player.name;
    let posicao = form.value.player.position;
    let nomeFile = form.value.player.fileName;
    let url = form.value.player.photo;
    let nota = form.value.grade;
    let key = form.value.player.key;

    this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/substitutes/' + key).set({
      name: nome,
      position: "reserva",
      photo: url,
      fileName: nomeFile,
      grade: nota
    });

    this.updateMatch(form);

  }

  storeCoach(form) {
    let nome = form.value.coach.name;
    let nomeFile = form.value.coach.fileName;
    let url = form.value.coach.photo;
    let posicao = form.value.coach.position;
    let nota = form.value.grade;
    let key = form.value.coach.key;

    this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/coaches/' + key).set({
      name: nome,
      photo: url,
      fileName: nomeFile,
      position: posicao,
      grade: nota
    });

    this.updateMatch(form);
  }

  storeReferee(form) {
    let nome = form.value.referee.name;
    let nomeFile = form.value.referee.fileName;
    let url = form.value.referee.photo;
    let posicao = form.value.referee.position;
    let nota = form.value.grade;
    let key = form.value.referee.key;

    this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/referees/' + key).set({
      name: nome,
      photo: url,
      fileName: nomeFile,
      position: posicao,
      grade: nota
    });

    this.updateMatch(form);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  detectType(event) {
    if (event.target.value == 'Jogador') {
      this.showPlayer = true;
      this.showCoach = false;
      this.showReferee = false;
    } else if (event.target.value == 'Tecnico') {
      this.showPlayer = false;
      this.showCoach = true;
      this.showReferee = false;
    } else if (event.target.value == 'Arbitro') {
      this.showPlayer = false;
      this.showCoach = false;
      this.showReferee = true;
    } else {
      this.showPlayer = false;
      this.showCoach = false;
      this.showReferee = false;
    }

  }


  deleteItem(item) {
    if (item.position == 'tecnico') {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/coaches/' + item.key).remove();
      this.firebase.database().ref("matches/" + this.route.snapshot.params['id']).once('value', data => this.subtractAvg(data, item.grade, this.route.snapshot.params['id']), this.errData);
    } else if (item.position == 'arbitro') {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/referees/' + item.key).remove();
      this.firebase.database().ref("matches/" + this.route.snapshot.params['id']).once('value', data => this.subtractAvg(data, item.grade, this.route.snapshot.params['id']), this.errData);
    } else if (item.position == 'reserva') {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/substitutes/' + item.key).remove();
      this.firebase.database().ref("matches/" + this.route.snapshot.params['id']).once('value', data => this.subtractAvg(data, item.grade, this.route.snapshot.params['id']), this.errData);
    } else {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/players/' + item.key).remove();
      this.firebase.database().ref("matches/" + this.route.snapshot.params['id']).once('value', data => this.subtractAvg(data, item.grade, this.route.snapshot.params['id']), this.errData);
    }
  }

  subtractAvg(data, grade, id) {
    var subtractGrade = parseFloat(data.val().average) - parseFloat(grade);
    this.firebase.database().ref("matches/" + id).update({
      average: subtractGrade
    })

  }

}

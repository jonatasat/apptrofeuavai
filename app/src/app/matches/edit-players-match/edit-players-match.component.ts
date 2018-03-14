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
  players: Observable<any[]>;
  playersMatch: Observable<any[]>;
  substitutesMatch: Observable<any[]>;
  storageRef: any;
  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

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
    this.playersMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/players').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.storageRef = this.firebase.storage().ref();
    this.substitutesMatch = this.db.list('matches/' + this.route.snapshot.params['id'] + '/substitutes').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.allItems.push(this.playersMatch);
    this.allItems.push(this.substitutesMatch);
    this.setPage(1);

    
  }


  onSubmit(form) {
    if (form.value.substitute == true) {
      this.storeSubstitute(form);
    } else {
      this.storePlayer(form);
    }
  }

  storePlayer(form) {
    let nome = form.value.player.name;
    let posicao = form.value.player.position;
    let nomeFile = form.value.player.fileName;
    let url = form.value.player.photo;
    let nota = form.value.grade.replace(/,/gi, ".");
    let key = form.value.player.key;
    let bestplayer = form.value.bestplayer;

    if(bestplayer){
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/players/' + key).set({
        name: nome,
        position: posicao,
        photo: url,
        fileName: nomeFile,
        grade: nota,
        bestplayer: true
      });
    }else{
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/players/' + key).set({
        name: nome,
        position: posicao,
        photo: url,
        fileName: nomeFile,
        grade: nota
      });
    }
    

  }

  storeSubstitute(form) {
    let nome = form.value.player.name;
    let posicao = form.value.player.position;
    let nomeFile = form.value.player.fileName;
    let url = form.value.player.photo;
    let nota = form.value.grade.replace(/,/gi, ".");
    let key = form.value.player.key;
    let bestplayer = form.value.bestplayer;

    if(bestplayer){
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/substitutes/' + key).set({
        name: nome,
        position: "reserva",
        photo: url,
        fileName: nomeFile,
        grade: nota,
        bestplayer: true
      });
    }else{
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/substitutes/' + key).set({
        name: nome,
        position: "reserva",
        photo: url,
        fileName: nomeFile,
        grade: nota
      });
    }

  }

  deleteItem(item) {
    if (item.position == 'reserva') {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/substitutes/' + item.key).remove();
    } else {
      this.db.database.ref('matches/' + this.route.snapshot.params['id'] + '/players/' + item.key).remove();
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}

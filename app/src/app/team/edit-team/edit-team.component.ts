import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFirestore } from 'angularfire2/firestore';
import {Upload} from './upload-team';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  file: File;
  fileName: string;
  teamName: string;
  image: string;
  currentUpload: Upload;
  preview: any;
  showOld: any;
  showNew: any;
  team;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) {
    console.log(this.route.snapshot.params['id']);
    this.showOld = true;
    this.showNew = false;
   }

  ngOnInit() {
    this.team = this.db.object('teams/'+ this.route.snapshot.params['id']).valueChanges();
  }

  store(url){
    let nome = this.teamName;
    this.db.list("teams").push(
      {
        name: nome,
        photo: url
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

  }

  onSubmit(form){
    this.teamName = form.value.name;
    let storageRef = this.firebase.storage().ref().child(this.fileName);
    let imgUrl = storageRef.getDownloadURL().then(url => this.store(url));
    this.db.database.ref('teams/'+ this.route.snapshot.params['id']).set({
      name: this.teamName,
      photo: this.file
  });
  

    this.router.navigate(['/team']);
  }

  detectFile(event){
    this.showOld = false;
    this.showNew = true;
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    let storageRef = this.firebase.storage().ref().child(event.target.files[0].name);
    let imgUrl = storageRef.getDownloadURL().then(url => this.image = url);
    this.preview = imgUrl;
  }

}

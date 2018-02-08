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
  storageRef: any;
  team: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) {
    console.log(this.route.snapshot.params['id']);
    this.showOld = true;
    this.showNew = false;
   }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.team = this.db.object('teams/'+ this.route.snapshot.params['id']).valueChanges();
    this.showOld = true;
    this.showNew = false;
  }

  store(url){
    let nome = this.teamName;
    this.firebase.database().ref("teams/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        photo: url
      }
    );

  }

  onSubmit(form){
    this.teamName = form.value.name;
    this.storageRef.child(this.fileName).getDownloadURL().then(url => this.store(url));
    

    this.router.navigate(['/team']);
  }

  detectFile(event){
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.preview = this.storageRef.child(this.fileName).put(this.file).then(function(result){
      if(result.state=='success'){
        return result.downloadURL;
      }
    });
    this.showOld = false;
    this.showNew = true;
  }

}

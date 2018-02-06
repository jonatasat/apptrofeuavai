import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import {Upload} from './upload-team';
import 'firebase/storage';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  file: File;
  fileName: string;
  teamName: string;
  image: string;
  currentUpload: Upload;
  preview: any;
  show: any;

  constructor(private angularFire: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) {  }

  ngOnInit() {
    this.show = false;
  }

  store(url){
    let nome = this.teamName;
    this.angularFire.list("teams").push(
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
    storageRef.put(this.file);

    this.router.navigate(['/team']);
  }


  detectFile(event){
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    let storageRef = this.firebase.storage().ref().child(event.target.files[0].name);
    let imgUrl = storageRef.getDownloadURL().then(url => this.image = url);
    this.preview = imgUrl;
    this.show = true;
  }


}

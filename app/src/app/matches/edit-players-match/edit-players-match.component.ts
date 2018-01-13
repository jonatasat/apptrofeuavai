import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-edit-players-match',
  templateUrl: './edit-players-match.component.html',
  styleUrls: ['./edit-players-match.component.css']
})
export class EditPlayersMatchComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .map(res => res)
    .subscribe(dados => console.log);
  }

}

import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as _ from 'underscore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  private allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  users: FirebaseListObservable<any[]>;


  constructor(private paginationService: PaginationService, private db: AngularFireDatabase) {
    this.users = db.list('users');
  }


  ngOnInit() {
    
    // for(let i=0; i< 10; i++){
    //   this.allItems.push(
    //     {
    //       row: i,
    //       name: 'Administrador' + i,
    //       login: 'admin' + i
    //     }
    //   );
    // }

    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(this.allItems.length, page);

    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}

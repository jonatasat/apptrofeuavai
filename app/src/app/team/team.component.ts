import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as _ from 'underscore';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  teams: FirebaseListObservable<any[]>;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.teams = this.db.list('teams');
    this.allItems.push(this.teams);
    
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

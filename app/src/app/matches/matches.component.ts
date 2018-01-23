import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as _ from 'underscore';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  private allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  matches: FirebaseListObservable<any[]>;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase) { }


  ngOnInit() {
    this.matches = this.db.list('matches');
    this.allItems.push(this.matches);

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

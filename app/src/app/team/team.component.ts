import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'

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

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    for(let i=0; i< 10; i++){
      this.allItems.push(
        {
          row: i,
          name: 'Team' + i,
        }
      );
    }
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

import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'

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

  constructor(private paginationService: PaginationService) { }


  ngOnInit() {
    
    for(let i=0; i< 10; i++){
      this.allItems.push(
        {
          row: i,
          time: 'Time' + i,
          placar: i + " x " + i,
          adversario: 'Adversario' + i,
          estadio: 'Estadio' + i,
          media: i + ',' + i
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

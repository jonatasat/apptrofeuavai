import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'

import * as _ from 'underscore';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  players: any[];

  constructor(private paginationService: PaginationService) { }


  ngOnInit() {

    this.players = [{
      name: 'Renan',
      posicao: 'zagueiro'
    }];
    this.allItems.push(this.players);

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

import { Component, Input, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

import { boatManage } from '../models/boat-manage.models';
import { mapManage } from '../models/map-manage.models';


@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})


export class BoatComponent implements OnInit {
  @Input() boatManager!: boatManage;
  setBoatOnMap: boolean=false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    // this.boatsArePlaced = this.sharedService.getAllBoats() ;
  }

  getArray(length: number) {
    return new Array(length);
  }

  range(start: number, end: number): number[] {
    return Array(end - start).fill(0).map((_, index) => start + index);
  }

  pivoter(boat: boatManage) {
    boat.orientation = !boat.orientation;
  }

  sendBoatPosition(boat: boatManage): void {
    this.sharedService.setBoatById(boat);
  }

  allBoatsPlacedOnTheMap() {
    return this.sharedService.allBoatsPlaced();
  }

}

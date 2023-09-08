import { Component, OnInit, Input } from '@angular/core';
import { boatManage } from '../models/boat-manage.models';
import { mapManage } from '../models/map-manage.models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @Input() mapManager!: mapManage;
  myBoats!: boatManage[];
  myMaps!: mapManage;
  randBoats!: boatManage[];

  alreadyFill: boolean = true;

  constructor(private shared_Service: SharedService) { }

  ngOnInit() {
    this.myBoats = this.shared_Service.getAllBoats();
    this.myMaps = this.shared_Service.getAllMaps()[1];
    this.randBoats = this.shared_Service.generateRandomBoats(this.myMaps);
    this.myMaps = this.shared_Service.getAllMaps()[1];
  }
  
  getArray(length: number) {
    return new Array(length);
  }

  range(start: number, end: number): number[] {
    return Array(end - start).fill(0).map((_, index) => start + index);
  }

  displayBoatsOnMap(map: mapManage): void {
    this.shared_Service.displayBoats(map, this.myBoats);
    if (this.alreadyFill) {
      this.shared_Service.displayBoatsOnBindMaps(this.myMaps, this.randBoats);
      this.alreadyFill = !this.alreadyFill;
    }
  }

  makeShot(i:number, j:number, map: mapManage): void {
    this.shared_Service.shot(i, j, map);
  }
}
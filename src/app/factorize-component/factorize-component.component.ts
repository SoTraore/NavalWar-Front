import { Component, OnInit } from '@angular/core';
import { boatManage } from '../models/boat-manage.models';
import { mapManage } from '../models/map-manage.models';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-factorize-component',
  templateUrl: './factorize-component.component.html',
  styleUrls: ['./factorize-component.component.scss']
})
export class FactorizeComponentComponent implements OnInit {

  myBoats!: boatManage[] ;
  myMaps!: mapManage[] ;

  constructor(private shared_service: SharedService) {}

  ngOnInit() {

    this.myBoats = this.shared_service.getAllBoats();
    this.myMaps = this.shared_service.getAllMaps();
  }
}

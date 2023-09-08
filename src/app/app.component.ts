import { Component, OnInit } from '@angular/core';
import { boatManage } from './models/boat-manage.models';
import { mapManage } from './models/map-manage.models';
import { position } from './models/position.models';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
      
  }
}

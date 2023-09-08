import { Injectable } from '@angular/core';
import { boatManage } from '../models/boat-manage.models';
import { mapManage } from '../models/map-manage.models';
import { position } from '../models/position.models';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  //-------------------- DEBUT DECLARATION --------------------- 

  myBoats: boatManage[] = [
    { 
      id: 5, 
      nbCase: 5, 
      orientation: false, 
      isPlaced: false, 
      colorB: "red", 
      pos: {x:-1, y:-1, id:5}
    },
    { 
      id: 4,
      nbCase: 4, 
      orientation: false, 
      isPlaced: false, 
      colorB: "green", 
      pos: {x:-1, y:-1, id:4}
    },
    { 
      id: 3,
      nbCase: 3, 
      orientation: false, 
      isPlaced: false, 
      colorB: "blue", 
      pos: {x:-1, y:-1, id:3}
    },
    {  
      id: 1,
      nbCase: 3, 
      orientation: false, 
      isPlaced: false, 
      colorB: "yellow", 
      pos: {x:-1, y:-1, id:1}
    },
    { 
      id: 2,
      nbCase: 2, 
      orientation: false, 
      isPlaced: false, 
      colorB: "orange", 
      pos: {x:-1, y:-1, id:2}
    }
  ] ;

  myMaps: mapManage[] = [
    {
      id: 1, 
      size: 10, 
      name: "Player Ships", 
      table: this.initTab("")
    },
    {
      id: 2,
      size: 10, 
      name: "Shoted Ships", 
      table: this.initTab("")
    }
  ] ;

  //-------------------- FIN DECLARATION ------------------------- 

  private initTab(color: string)
  : string[][] {
    const table: string[][] = [];
    for (let i = 0; i < 10; i++) {
      const row: string[] = [];
      for (let j = 0; j < 10; j++) {
        row.push(color);
      }
      table.push(row);
    }
    return table;
  }

  //--------------------------- GET -------------------------------

  getAllBoats()
  : boatManage[] {
    return this.myBoats;
  }

  getAllMaps()
  : mapManage[] {
    return this.myMaps;
  }

  getBoatById(boatId: number)
  : boatManage {
    const boat = this.myBoats.find(boat => boat.id === boatId) ;
    if (boat) {
      return boat ;
    }
    else{
      throw new Error("Boat not found!") ;
    }
  }

  getMapById(mapId: number)
  : mapManage {
    const map = this.myMaps.find(map => map.id === mapId) ;
    if (map) {
      return map;
    }
    else {
      throw new Error("Map not found!");
    }
  }

  //--------------------------- POST --------------------------------

  setBoatPositionById(boatId: number, pos: position)
  : void {
    let i=0;
    while (i<this.myBoats.length && this.myBoats[i].id != boatId) {
      i++;
    }
    if (i<this.myBoats.length && this.myBoats[i].id === boatId) {
      this.myBoats[i].pos = pos;
    }
  }

  setBoatById(newBoat: boatManage)
  : void {
    const boat = this.getBoatById(newBoat.id);
    this.setBoatPositionById(boat.id, boat.pos);
  }
  
  setBoats(boats: boatManage[])
  : void {
    for (let boat of boats) {
      this.setBoatById(boat);
    }
  }

  setMapById(mapId: number, map: mapManage)
  : void {
    if (mapId <= this.myMaps.length) {
      for (let i=0; i<this.myMaps[mapId-1].table.length; i++) {
        for (let j=0; j<this.myMaps[mapId-1].table.length; j++) {
          this.myMaps[mapId-1].table[i][j] = map.table[i][j] ;
        }
      }
    }
  }

  setMaps(maps: mapManage[])
  : void {
    if (maps.length === this.myMaps.length) {
      for (let map of maps) {
        this.setMapById(map.id, map);
      }
    }
    else {
      throw new Error ("Invalid size of the new map");
    }
  }

  //--------------------------------------------------------------------

  canbeSet(map: mapManage, boat: boatManage)
  : boolean {
    let result: boolean=false;
    let k!: number;

    if (!boat.isPlaced) {

      if (!boat.orientation) { // false -- horizontal

        let size = boat.nbCase+boat.pos.y;
        if(size < map.table.length) {
          k=boat.pos.y;
          while (k<size && map.table[k][boat.pos.x].length === 0) {
            k++;
          }
          result = (k === size);
        }
        else {
          throw new Error("Index out of range!");
        }

      } else {

        let size = boat.nbCase+boat.pos.x;
        if(size < map.table.length) {
          k=boat.pos.x;
          while (k<size && map.table[k][boat.pos.y].length === 0) {
            k++;
          }
          result = (k === size);
        }
        else {
          throw new Error("Index out of range!");
        }

      }

    }

    return result;
  }
  
  // le parcours du est du bas vers le haut 
  // Ne prends pas en compte l'inverse

  displayBoat(map: mapManage, boat: boatManage)
  : void {

    if (this.canbeSet(map, boat)) {
      let i: number=boat.pos.x;
      let j: number=boat.pos.y;
      if (boat.orientation) {
        let size = boat.pos.x+boat.nbCase;
        for (i; i<size; i++) {
          map.table[i][j] = boat.colorB;
        }
      } 
      else {
        let size=boat.pos.y+boat.nbCase;
        for (j; j<size; j++) {
          map.table[i][j] = boat.colorB;
        }
      }
      boat.isPlaced = true;
    }

  }

  displayBoats(map: mapManage, boats: boatManage[])
  : void {
    for (let boat of boats) {
      this.displayBoat(map, boat);
    }
  }

  displayBoatsOnBindMaps(map: mapManage, boats: boatManage[])
  : void {
    let bindBoats: boatManage[] = this.generateRandomBoats(map);
    this.displayBoats(map, bindBoats) ;
  }

  // This is for displaying all the boats on the maps

  updateMap(maps: mapManage[], boats: boatManage[][])
  : void {
    for (let i=0; i<maps.length; i++) {
      for (let boat of boats) {
        this.displayBoats(maps[i], boat);
      }
    }
  }

  desactiveBoat(desac: boatManage)
  : void {
    if (!desac.isPlaced) {
      desac.colorB = "";
      desac.isPlaced = false;
      desac.pos.x = -1;
      desac.pos.y = -1;
    }
  }

  //------------------------- FILL THE MAPS --------------------------------

  allBoatsPlaced()
  : boolean {
    let result: boolean = false;
    let i=0;
    while (i<this.myBoats.length && this.myBoats[i].isPlaced) {
      i++;
    }
    result = i === this.myBoats.length;
    return result ;
  }

  generateRandomBoat(idValue: number, nbC: number, maxValue: number)
  : boatManage {
    return {
      id : idValue,
      nbCase: nbC,
      orientation: (Math.random() >= 0.5) ? true : false,
      isPlaced: false,
      colorB: 'white',
      pos: {
        x: Math.floor(Math.random() * maxValue),
        y: Math.floor(Math.random() * maxValue),
        id: idValue
      }
    };
  }

  generatePosition(idValue: number, maxValue: number)
  : position {
    return {
      x: Math.floor(Math.random() * maxValue),
      y: Math.floor(Math.random() * maxValue),
      id: idValue
    } ;
  }

  checkPosition(map: mapManage, boats: boatManage[], newBoat: boatManage) 
  : void {

    let isValidPosition: boolean = false;
    let maxValue: number = 10, idValue: number = newBoat.id; 
    this.displayBoats(map, boats);

    while (!isValidPosition) {
      isValidPosition = this.canbeSet(map, newBoat);
      if (!isValidPosition) {
        let pos: position = this.generatePosition(idValue, maxValue);
        newBoat.pos = pos ;
      }
    }

    boats.push(newBoat);
  }

  generateRandomBoats(map: mapManage)
  : boatManage[] {

    let boats: boatManage[] = [];
    let idValue=2;
    let maxValue = 10;
    boats.push(this.generateRandomBoat(1, 3, maxValue));

    while (idValue != 5) {
        let boat: boatManage = this.generateRandomBoat(idValue, idValue, maxValue);
        this.checkPosition(map, boats, boat);
        idValue++;
    }

    return boats;
  }

  shot(i:number, j:number, map: mapManage): void {
    if (map.table[i][j] != '') {
      map.table[i][j] = 'black';
    } 
  }

  //--------------------------------------------------------------------------

}

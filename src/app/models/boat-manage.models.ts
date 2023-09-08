import { position } from "./position.models";

export class boatManage {
    constructor(public id: number,
                public nbCase: number,
                public orientation: boolean,
                public isPlaced: boolean,
                public colorB: string, 
                public pos: position) {
    }
}
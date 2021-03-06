import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WalksService } from '../../providers/walks.service';
import { AudioProvider } from 'ionic-audio'; 


@Component({
  selector: 'page-waypoint',
  templateUrl: 'waypoint.html'
})
export class WaypointPage {
	name:string; 
    info:string;
    walkDir:string; 
    waypointNum:string;  
    images:string[]; 
    myTracks:any; 
    aPTracks:any; 

  	constructor(public navCtrl: NavController, public navParams: NavParams ,private walksService: WalksService,private audioProvider: AudioProvider) {
        this.name = this.navParams.get("name");
        this.info = this.navParams.get("info"); 
        this.walkDir = this.navParams.get("walkDir"); 
        this.waypointNum = this.navParams.get("waypointNum").toString(); 
      
        let imageFilename = this.name.toLowerCase().replace(/\s/g,'_').replace(/\'/g,''); 
        this.walksService.getWaypointImgPaths(imageFilename).then(paths => { 
            this.images = paths;
  
        });

        this.myTracks= [{
            src: `http://api-walks.emiliedannenberg.co.uk/waypoint-audio/${this.walkDir}/waypoint_${this.waypointNum}.mp3`,
            preload: 'none'
        }];
    }

    ngAfterViewInit(){
        this.aPTracks = this.audioProvider.tracks;  
        this.audioProvider.play(this.aPTracks[this.aPTracks.length-1].id); 
    }

    ionViewDidLeave() {
        this.audioProvider.stop(this.aPTracks[this.aPTracks.length-1].id); 
    }

}

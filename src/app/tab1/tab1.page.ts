import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';           
import { RouterLink } from '@angular/router';
import { RandomOrg } from '../services/random-org';



//import { Proximity } from '@anuradev/capacitor-proximity';

// Importujeme také typ pro "Listener"
import { PluginListenerHandle } from '@capacitor/core';


import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent, 
  IonSpinner } from '@ionic/angular/standalone';

 import { Subscription, throttleTime } from 'rxjs';
import { ProximityService } from '../services/proximity.service';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonSpinner, 
    CommonModule,
    FormsModule,                 
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton,
    IonSegment, IonSegmentButton, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, FormsModule

  ],
})
export class Tab1Page {
  dice: number = 6;            // aktuálně zvolená kostka  D šestka je výchozí, protože je jako první
  vysledek: number | null = null;  // poslední hod
  cekame: boolean = false;
 private proxSub?: Subscription;
  private proximityListener: PluginListenerHandle | null = null;

  constructor (private randomOrg:RandomOrg, private prox: ProximityService){}
 

    ngOnInit() {
    // Spustí hod při zakrytí proximity senzoru (near = true)
    this.proxSub = this.prox
      .watch()
      .pipe(throttleTime(800, undefined, { leading: true, trailing: false }))
      .subscribe((near) => {
        if (near) this.hod();
      });
    }

  ngOnDestroy() {
    this.proxSub?.unsubscribe();
  }

hod(){
  this.cekame = true;
  this.vysledek = null;

  this.randomOrg.getHod(this.dice).subscribe({
    next: (res:any)=>{
      this.vysledek = res.result.random.data[0];
      this.cekame=false;
    },
    error: (err)=> {
      console.error('Chyba api', err);
      this.cekame = false;
    }
  });
}
}

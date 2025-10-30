import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';              // ← pro [(ngModel)]
import { RouterLink } from '@angular/router';
import { RandomOrg } from '../services/random-org';
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
  IonCardContent, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonSpinner, 
    CommonModule,
    FormsModule,                   // ← přidáno
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton,
    IonSegment, IonSegmentButton, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent

  ],
})
export class Tab1Page {
  dice: number = 6;            // aktuálně zvolená kostka (D6)
  vysledek: number | null = null;  // poslední hod
  cekame: boolean = false;
  constructor (private randomOrg:RandomOrg){}

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

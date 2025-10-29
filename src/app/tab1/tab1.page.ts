import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';              // ← pro [(ngModel)]
import { RouterLink } from '@angular/router';
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
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
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
  dice = 6;            // aktuálně zvolená kostka (D6)
  last: number | null = null;  // poslední hod

  manualRoll() {
    const min = 1, max = this.dice;
    this.last = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProximityService {
  constructor(private zone: NgZone, private plt: Platform) {}

  watch(): Observable<boolean> {
    return new Observable(sub => {
      if (!this.plt.is('android')) {
        sub.error('Proximity: testuj na Android zařízení.');
        return;
      }
      const handler = (e: any) => {
        this.zone.run(() => sub.next(!!e?.near));
      };
      // @ts-ignore
      window.addEventListener('proximity', handler, false);

      return () => {
        // @ts-ignore
        window.removeEventListener('proximity', handler, false);
      };
    });
  }
}

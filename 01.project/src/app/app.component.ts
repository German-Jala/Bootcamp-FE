import { Component, EventEmitter, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CARS_MOCK } from './MOCK_CAR';
import { BehaviorSubject, interval, Subscription, tap } from 'rxjs';
import { Car } from './car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = '01.project';

  protected readonly cars = CARS_MOCK;

  protected carsArray = [...this.cars];
  protected carsArrayInFuction = () => [...this.cars];
  protected $carsObservable = new BehaviorSubject<Car[]>([]);
  protected carsSignal = signal([...this.cars]);

  private timerSuscription?: Subscription;

  ngOnInit(): void {
    this.timerSuscription = this.emitEvery5Seconds();
  }

  ngOnDestroy(): void {
    if(this.timerSuscription) this.timerSuscription.unsubscribe();
    this.$carsObservable.complete();
  }

  private emitEvery5Seconds = () => {
    return interval(5000).subscribe(() => {
      console.log('--- INTERVAL TICK ---');
      // STATIC ARRAY
      this.carsArray = [...this.cars];

      // CARS ARRAY IN FUNCTION
      this.carsArrayInFuction = () => {
        console.log('triggered carsArrayInFuction')
        return [...this.cars]
      };

      // CARS IN SUSCRIBE
      this.$carsObservable.next([...this.cars]);

      // CARS IN SIGNAL
      this.carsSignal.update(cars => {
        console.log('triggered carSignal')
        return [...cars]
      })
    });
  }

}

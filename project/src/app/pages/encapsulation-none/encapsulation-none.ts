import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-encapsulation-none',
  imports: [MatLabel, MatSelect, MatOption, MatFormField],
  template: `
    <h1>Encapsulation - None</h1>
    <div class="contenedor-selector">
      <mat-form-field>
        <mat-label>Selecciona una opción</mat-label>
        <mat-select panelClass="mi-panel-personalizado">
          <mat-option value="1">Opción A</mat-option>
          <mat-option value="2">Opción B</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .mi-panel-personalizado {
        background-color: #31078e !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class EncapsulationNone { }

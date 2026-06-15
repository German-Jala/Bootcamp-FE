import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  imports: [MatLabel, MatSelect, MatOption, MatFormField],
  selector: 'app-encapsulation-emulated',
  template: `
    <h1>Encapsulation - Emulated</h1>
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
        background-color: #d82e22 !important;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated, // It's not necessary, it default option
})
export class EncapsulationEmulated { }

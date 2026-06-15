import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { EncapsulationShadow } from '../encapsulation-shadow/encapsulation-shadow';

@Component({
  selector: 'app-encapsulation-experiment-shadow',
  imports: [MatLabel, MatSelect, MatOption, MatFormField, EncapsulationShadow],
  templateUrl: './encapsulation-experiment-shadow.html',
  styleUrl: './encapsulation-experiment-shadow.css',
})
export class EncapsulationExperimentShadow {}

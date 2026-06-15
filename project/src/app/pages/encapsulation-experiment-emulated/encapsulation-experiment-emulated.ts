import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { EncapsulationNone } from "../encapsulation-none/encapsulation-none";

@Component({
  selector: 'app-encapsulation-experiment-emulated',
  imports: [MatLabel, MatSelect, MatOption, MatFormField, EncapsulationNone],
  templateUrl: './encapsulation-experiment-emulated.html',
  styleUrl: './encapsulation-experiment-emulated.css',
})
export class EncapsulationExperimentEmulated {}

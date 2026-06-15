import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { EncapsulationEmulated } from "../encapsulation-emulated/encapsulation-emulated";

@Component({
  selector: 'app-encapsulation-experiment-emulated',
  imports: [MatLabel, MatSelect, MatOption, MatFormField, EncapsulationEmulated],
  templateUrl: './encapsulation-experiment-emulated.html',
  styleUrl: './encapsulation-experiment-emulated.css',
})
export class EncapsulationExperimentEmulated {}

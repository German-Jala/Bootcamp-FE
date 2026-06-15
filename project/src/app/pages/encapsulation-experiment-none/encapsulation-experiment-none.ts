import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { EncapsulationNone } from "../encapsulation-none/encapsulation-none";

@Component({
  selector: 'app-encapsulation-experiment-none',
  imports: [MatLabel, MatSelect, MatOption, MatFormField, EncapsulationNone],
  templateUrl: './encapsulation-experiment-none.html',
  styleUrl: './encapsulation-experiment-none.css',
})
export class EncapsulationExperimentNone {}

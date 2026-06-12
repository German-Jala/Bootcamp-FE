import { Component } from '@angular/core';
import { Counter } from './counter/counter';
import { JsonViewer } from './json-viewer/json-viewer';

@Component({
  selector: 'app-inputs',
  imports: [Counter, JsonViewer],
  templateUrl: './inputs.html',
  styleUrl: './inputs.css',
})
export class Inputs {
  initialCount = 18;

  userData = {
    id: 1,
    name: 'Bruno',
    email: 'bruno@test.com',
    active: true,
    role: 'Frontend Student',
    loginCount: 7,
  };
}

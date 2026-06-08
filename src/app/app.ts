import { Component } from '@angular/core';
import { Instruction } from './instruction/instruction';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Instruction, RouterOutlet],
})
export class App {


}

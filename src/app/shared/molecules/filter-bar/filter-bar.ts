// Step 4: New Component
import { Component, inject } from '@angular/core';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBarComponent {
  readonly cardService = inject(CardService);

  readonly cardTypes = [
    { label: 'Todos los tipos', value: '' },
    { label: 'Efecto (Monster)', value: 'Effect Monster' },
    { label: 'Normal (Monster)', value: 'Normal Monster' },
    { label: 'Spell Card', value: 'Spell Card' },
    { label: 'Trap Card', value: 'Trap Card' },
    { label: 'Fusion Monster', value: 'Fusion Monster' },
    { label: 'Synchro Monster', value: 'Synchro Monster' },
    { label: 'XYZ Monster', value: 'XYZ Monster' },
    { label: 'Link Monster', value: 'Link Monster' },
  ];

  readonly attributes = [
    { label: 'Todos los atributos', value: '' },
    { label: 'DARK 🌑', value: 'DARK' },
    { label: 'LIGHT ⚡', value: 'LIGHT' },
    { label: 'FIRE 🔥', value: 'FIRE' },
    { label: 'WATER 💧', value: 'WATER' },
    { label: 'EARTH ⛰️', value: 'EARTH' },
    { label: 'WIND 🌪️', value: 'WIND' },
    { label: 'DIVINE 🌟', value: 'DIVINE' },
  ];

  readonly races = [
    { label: 'Todas las clasificaciones', value: '' },
    { label: 'Dragon 🐲', value: 'Dragon' },
    { label: 'Spellcaster 🧙‍♂️', value: 'Spellcaster' },
    { label: 'Warrior ⚔️', value: 'Warrior' },
    { label: 'Machine 🤖', value: 'Machine' },
    { label: 'Fiend 👿', value: 'Fiend' },
    { label: 'Zombie 🧟', value: 'Zombie' },
    { label: 'Cyberse 🌐', value: 'Cyberse' },
    { label: 'Normal (Spell/Trap)', value: 'Normal' },
    { label: 'Continuous', value: 'Continuous' },
    { label: 'Quick-Play', value: 'Quick-Play' },
  ];

  onTypeChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.cardService.setType(val);
  }

  onAttributeChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.cardService.setAttribute(val);
  }

  onRaceChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.cardService.setRace(val);
  }

  clearFilters(): void {
    this.cardService.resetFilters();
  }
}

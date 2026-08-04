import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Card } from '../models/card.model';

describe('CardService - HU-05 (Focused Card)', () => {
  let service: CardService;

  const dummyCard1: Card = {
    id: 101,
    name: 'Blue-Eyes White Dragon',
    type: 'Normal Monster',
    desc: 'Legendary dragon',
    card_images: [],
    card_prices: [],
  };

  const dummyCard2: Card = {
    id: 102,
    name: 'Dark Magician',
    type: 'Normal Monster',
    desc: 'Ultimate wizard',
    card_images: [],
    card_prices: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CardService);
  });

  it('should allow setting a card in focus and modifying local candidate state', () => {
    service.setFocusedCard(dummyCard1);
    expect(service.focusedCard()?.id).toBe(101);
    expect(service.isFocusedCandidate()).toBe(false);

    // Toggle candidate locally
    service.toggleFocusedCandidate();
    expect(service.isFocusedCandidate()).toBe(true);

    // Update notes locally
    service.updateFocusedNotes('Potential ace card');
    expect(service.focusedNotes()).toBe('Potential ace card');
  });

  it('should preserve focused card selection when search parameters change', () => {
    service.setFocusedCard(dummyCard1);
    service.toggleFocusedCandidate();
    service.updateFocusedNotes('Keep across search');

    // Change search parameters
    service.search('Magician');
    service.setType('Spell');

    // Focused card and local modifications must be preserved
    expect(service.focusedCard()?.id).toBe(101);
    expect(service.isFocusedCandidate()).toBe(true);
    expect(service.focusedNotes()).toBe('Keep across search');
  });

  it('should clear focused card when clearFocusedCard is called', () => {
    service.setFocusedCard(dummyCard2);
    expect(service.focusedCard()?.id).toBe(102);

    service.clearFocusedCard();
    expect(service.focusedCard()).toBeNull();
  });
});

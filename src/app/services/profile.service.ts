import { Injectable, signal, computed } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly duelistAlias = signal<string>(localStorage.getItem('duelistAlias') || '');
  readonly isConfigured = computed(() => !!this.duelistAlias().trim());

  private readonly collectionKey = 'duelistCollection';
  readonly collection = signal<Card[]>(this.loadCollection());

  private loadCollection(): Card[] {
    const saved = localStorage.getItem(this.collectionKey);
    return saved ? JSON.parse(saved) : [];
  }

  setAlias(alias: string): void {
    const trimmed = alias.trim();
    this.duelistAlias.set(trimmed);
    localStorage.setItem('duelistAlias', trimmed);
  }

  clearSession(): void {
    this.duelistAlias.set('');
    this.collection.set([]);
    localStorage.removeItem('duelistAlias');
    localStorage.removeItem(this.collectionKey);
  }

  addToCollection(card: Card): void {
    if (!this.isInCollection(card.id)) {
      this.collection.update((list) => {
        const updated = [...list, card];
        localStorage.setItem(this.collectionKey, JSON.stringify(updated));
        return updated;
      });
    }
  }

  removeFromCollection(cardId: number): void {
    this.collection.update((list) => {
      const updated = list.filter((c) => c.id !== cardId);
      localStorage.setItem(this.collectionKey, JSON.stringify(updated));
      return updated;
    });
  }

  isInCollection(cardId: number): boolean {
    return this.collection().some((c) => c.id === cardId);
  }
}

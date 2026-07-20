import { Component, inject, signal, input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormsModule } from '@angular/forms';
import { Button } from '../../shared/atoms/button/button';

@Component({
  selector: 'app-profile-page',
  imports: [FormsModule, Button],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfilePage {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  readonly returnUrl = input<string>('');

  aliasInput = signal<string>(this.profileService.duelistAlias());

  saveProfile(): void {
    const alias = this.aliasInput().trim();
    if (alias) {
      this.profileService.setAlias(alias);
      const redirect = this.returnUrl() || '/collection';
      this.router.navigateByUrl(redirect);
    }
  }
}

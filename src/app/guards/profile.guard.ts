import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const profileGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.isConfigured()) {
    return true;
  }

  // Redirect to profile setup with the returnUrl query parameter
  return router.createUrlTree(['/profile'], {
    queryParams: { returnUrl: state.url },
  });
};

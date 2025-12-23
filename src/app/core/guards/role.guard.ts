import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function roleGuard(allowedRoles: string[]) {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.user;

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    if (!allowedRoles.includes(user.rol)) {
      router.navigate(['/no-autorizado']);
      return false;
    }

    return true;
  };
}

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export function roleGuard(allowedRoles: string[]) {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.currentUser$.pipe(
      map(user => {
        if (!user) {
          return router.parseUrl('/login');
        }

        if (!allowedRoles.includes(user.rol)) {
          return router.parseUrl('/no-autorizado');
        }

        return true;
      })
    );
  };
}
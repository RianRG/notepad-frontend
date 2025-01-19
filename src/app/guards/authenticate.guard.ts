import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { tap } from 'rxjs';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const authenticateService = inject(AuthenticateService);
  const router = inject(Router)

  return authenticateService.isAuthenticated().pipe(
    tap(isAuth => {
      if(!isAuth) router.navigateByUrl('/login')
    })
  )
};

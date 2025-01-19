import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { tap } from 'rxjs';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpService);
  const router = inject(Router)

  return http.isAuthenticated().pipe(
    tap(isAuth =>{
      if(!isAuth) router.navigateByUrl('/login')
    })
  )
  
};

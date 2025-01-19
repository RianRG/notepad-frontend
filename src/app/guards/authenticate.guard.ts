import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { catchError, delay, of, retryWhen, take, tap, timeout } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const loadingService = inject(LoadingService)
  loadingService.setLoading(true);
  const http = inject(HttpService);
  const router = inject(Router)
  return http.isAuthenticated().pipe(
    tap(isAuth => {
      // if(!isAuth) router.navigateByUrl('/login')
      setTimeout(() =>{
        loadingService.setLoading(false)
      }, 1000)
    })
  );
  
};

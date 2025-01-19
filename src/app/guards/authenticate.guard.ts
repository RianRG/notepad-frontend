import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { catchError, delay, map, of, tap, timeout } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const loadingService = inject(LoadingService)
  const http = inject(HttpService);
  const router = inject(Router)
  loadingService.setLoading(true);
  return http.isAuthenticated().pipe(
    tap(isAuth => {
      loadingService.setLoading(false)
    }),

  );
  
};

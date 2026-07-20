import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let friendlyMessage = 'Ocurrió un problema de conexión con el servidor. Por favor, comprueba tu conexión a internet o inténtalo de nuevo más tarde.';

      if (error.status === 0) {
        friendlyMessage = 'No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión a internet.';
      } else if (error.status === 400 || (error.error && error.error.error)) {
        const apiError = error.error?.error;
        if (apiError && apiError.includes('No card matching your query was found')) {
          friendlyMessage = 'No pudimos encontrar cartas que coincidan con la búsqueda. Intenta con otro término.';
        } else {
          friendlyMessage = apiError || 'La solicitud no pudo ser procesada.';
        }
      } else if (error.status === 404) {
        friendlyMessage = 'La carta o recurso solicitado no fue encontrado.';
      } else if (error.status === 500) {
        friendlyMessage = 'El servidor de Yu-Gi-Oh! experimentó un problema interno. Por favor, inténtalo de nuevo en unos minutos.';
      }

      return throwError(() => new Error(friendlyMessage));
    })
  );
};

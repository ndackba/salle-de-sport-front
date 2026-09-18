import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Une erreur inattendue est survenue.';

      if (error.status === 0) {
        message = 'Impossible de contacter le serveur. Vérifiez votre connexion ou que l\'API est bien démarrée.';
      } else if (error.status === 400) {
        message = error.error?.message || 'Requête invalide : vérifiez les données saisies.';
      } else if (error.status === 404) {
        message = 'Ressource introuvable.';
      } else if (error.status === 409) {
        message = error.error?.message || 'Conflit : cette ressource existe déjà.';
      } else if (error.status === 500) {
        message = 'Erreur interne du serveur.';
      }

      console.error(`[HTTP ${error.status}]`, message, error);

      // Pour l'instant on log en console ; on pourra brancher un service de notification (toast) ensuite
      return throwError(() => new Error(message));
    })
  );
};
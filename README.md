# Salle de Sport - Front Angular

Application front-end Angular consommant l'API REST **API Salle de Sport** (Spring Boot) développée dans le cadre de l'Exo 5 du fil rouge.

## Contexte

Ce projet permet de gérer les adhérents d'une salle de sport : consultation, création, modification et suppression via une interface web connectée à l'API backend.

## Fonctionnalités

- **Liste paginée** des adhérents (tri par nom, navigation page suivante/précédente)
- **Formulaire réactif** de création et modification d'un adhérent, avec validation des champs (nom, prénom, email, date de naissance)
- **Page de détail** d'un adhérent
- **Gestion centralisée des erreurs HTTP** via un interceptor global (400, 404, 409, 500, erreurs réseau)
- Tous les appels HTTP encapsulés dans des **services** dédiés (aucun appel direct depuis les composants)

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [Angular CLI](https://angular.dev/tools/cli) installé globalement : `npm install -g @angular/cli`
- L'API backend **salle-de-sport-api** (Spring Boot) démarrée sur `http://localhost:8080`

## Installation

```bash
git clone <url-du-depot>
cd salle-de-sport-front
npm install
```

## Lancement

```bash
ng serve
```

L'application est accessible sur `http://localhost:4200`.

> ⚠️ L'API backend (`salle-de-sport-api`) doit être démarrée au préalable sur le port `8080`, avec une configuration CORS autorisant l'origine `http://localhost:4200`.

## Architecture du projet

```
src/app/
├── components/
│   ├── adherent-list/      # Liste paginée des adhérents
│   ├── adherent-form/      # Formulaire réactif (création / édition)
│   └── adherent-detail/    # Page de détail d'un adhérent
├── services/
│   └── adherent.ts         # Service HTTP (CRUD) pour les adhérents
├── interceptors/
│   └── error-handler-interceptor.ts  # Gestion centralisée des erreurs HTTP
├── models/
│   ├── adherent.ts         # Interface Adherent / AdherentInput
│   └── page.ts             # Interface générique pour la pagination Spring
├── app.routes.ts           # Configuration du routing
└── app.config.ts           # Configuration de l'application (HttpClient, interceptor)
```

## Routing

| Route                 | Composant        | Description                   |
| --------------------- | ---------------- | ----------------------------- |
| `/adherents`          | `AdherentList`   | Liste paginée des adhérents   |
| `/adherents/new`      | `AdherentForm`   | Création d'un nouvel adhérent |
| `/adherents/:id`      | `AdherentDetail` | Détail d'un adhérent          |
| `/adherents/:id/edit` | `AdherentForm`   | Modification d'un adhérent    |

## Configuration de l'API

L'URL de base de l'API est définie dans les fichiers d'environnement :

- `src/environments/environment.development.ts` (développement)
- `src/environments/environment.ts` (production)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};
```

## Gestion des erreurs

Un `HttpInterceptor` global (`error-handler-interceptor.ts`) intercepte toutes les réponses HTTP en erreur et transforme les codes techniques en messages compréhensibles :

- `0` → Serveur injoignable
- `400` → Requête invalide
- `404` → Ressource introuvable
- `409` → Conflit (ex. contrainte d'unicité ou d'intégrité référentielle)
- `500` → Erreur interne du serveur

## Auteur

Projet réalisé dans le cadre du bloc d'exercices Java/Web - Fil rouge "Salle de sport et abonnements".
Prérequis : Java 21

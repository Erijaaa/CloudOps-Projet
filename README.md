
## Installation
```bash
npm install @nestjs/swagger class-validator class-transformer
```

## Lancer
```bash
npm run start:dev
```

## Contenu
- 39 endpoints REST documentés (cahier des charges : minimum 20)
- 8 entités : User, Project, ProjectMember, Server, Metric, Application, AlertRule, Alert
- DTO validés (class-validator), pagination / recherche / filtres, erreurs centralisées
- Auth JWT documentée avec `@ApiBearerAuth('access-token')` (bouton « Authorize »)

## Reste à faire 
1. Remplacer `MemoryService` par Prisma ou TypeORM (mêmes noms de méthodes).
2. Auth : bcrypt + `@nestjs/jwt` + `JwtAuthGuard` + `@Roles()` / `RolesGuard`.
3. Docker / Compose, tests, README final avec ton nom et le lien Git.

## Prerequisites

Nodejs 18
Postgres

## Note
Requires windows using tyorm version 0.3.11.
## Quick run

```bash
cp env-sample .env
npm install
npm run migration:run
npm run start:dev
```

## Database utils

Generate migration to folder "src/database/migrations"

```bash
name=file-name npm run migration:generate
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

## Run Docker
```
docker compose up
```
## Script create `Module,controller,services` of `Nestjs`

```bash
# Open terminal at src then run script
Exam:
file=product/product yarn create:module          # Create product module inside product folder
file=product/product yarn create:controller      # Create product controller inside product folder
file=product/product yarn create:service         # Create product service inside product folder
module=product file=product yarn create:dto      # Create dto folder inside product
module=product file=product yarn create:entities # Create folder entities inside product folder
```

**.env**
  // PRISMA
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db?schema=public"

  // JWT
  JWT_SECRET=una_clave_secreta_temporal_para_desarrollo
  JWT_EXPIRES_IN=1h

**cositas**
  ver arbol de carpetas
  > tree src /F

  lista instalaciones
  > npm list --depth=0

**instalacion**

0 - inicio
> npm init -y

1 - Instalar TypeScript y demás dependencias
> npm i -D typescript @types/node ts-node-dev rimraf

2 - Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
> npx tsc --init --outDir dist/ --rootDir src

3 - en package.json
  Crear scripts para dev, build y start (Más sobre TS-Node-dev aquí)
  **AGREGAR**
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

4 - en tsconfig
  * copiar
  **AGREGAR**
    "exclude": ["node_modules", "dist"],
    "include": ["src"],
  * editar
  **EDITAR**
    verbatimModuleSyntax: true -> false
    "types": ["node"],
  **COMENTAR**
  "jsx": "react-jsx",

BASE
  > npm install -D @types/node

ERRORS
  version ts que funciona con node
  > npm install -D typescript@5.9.3  

OTROS
  env
  > npm install dotenv

  validaciones
  > npm install zod

EXPRESS
  > npm install express
  > npm install -D @types/express

ARCHIVOS
  > npm install multer
  > npm install -D @types/multer
  > npm install file-type

CORS
  > npm install cors
  > npm install -D @types/cors

Swagger / OpenAPI
  > npm install swagger-ui-express
  > npm install -D @types/swagger-ui-express

PostgresSQL
  > npm install pg
  > npm install -D @types/pg

Prisma
  > npm install prisma --save-dev
  > npm install @prisma/client
  > npm install @prisma/adapter-pg pg

  > npm install --save-dev prisma@7.10.1
  > npm install @prisma/client@7.10.1
  > npm install @prisma/adapter-pg@7.10.1 pg

  Inicializa la estructura de Prisma.
  > npx prisma init --datasource-provider postgresql

  - en schema.prisma
    generator client {
        provider = "prisma-client"
        output   = "../src/generated/prisma"
        **AGREGAR** importFileExtension = "ts" **AGREGAR**
    }

  prisma generate: genera Prisma Client a partir de los modelos definidos en schema.prisma.
  (proyecto recien descargado o creado)
  > npm install
  > npx prisma generate

  **MODELAR BASE DE DATOS**

              prisma validate: comprueba que schema.prisma tenga una estructura válida.              
              > npx prisma validate  

              estatus de la base de datos
              > npx prisma migrate status
  
  prisma migrate dev: crea y aplica migraciones durante el desarrollo.
  > npx prisma migrate dev --name init --create-only
  
  > npx prisma migrate dev --name add_product_sku
  > npx prisma generate

    **agregar a app.ts**
    import "dotenv/config";

  prisma migrate deploy: aplica las migraciones pendientes que ya existen, sin crear nuevas.
  > npx prisma migrate deploy
  > npx prisma generate
  
  prisma migrate reset: restablece la base de datos de desarrollo, elimina sus datos y vuelve a aplicar las migraciones.
  > npx prisma migrate reset

  prisma db push: sincroniza la estructura de la base de datos con schema.prisma sin crear archivos de migración.  
  > npx prisma db push

Contraseña
  > npm install bcrypt
  > npm install -D @types/bcrypt

  > npm install-scripts approve bcrypt
  > npm install-scripts approve @prisma/engines
  > npm install-scripts approve prisma

  > npm ls bcrypt @types/bcrypt


JWT
  > npm install jsonwebtoken
  > npm install -D @types/jsonwebtoken

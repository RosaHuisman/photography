
BEGIN;

DROP TABLE IF EXISTS "user", "galerie",
"photos";


CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "firstname" TEXT NULL,
  "lastname" TEXT NULL,
  "role" TEXT DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP,
  "status" INTEGER DEFAULT 0
);

CREATE TABLE "galerie" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE "photos" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "galerie_id" integer NOT NULL REFERENCES "galerie"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);


INSERT INTO "user" ("firstname", "lastname", "email", "password", "role", "status") VALUES
('Rosa', 'Huisman', 'rosahuisman@hotmail.fr', '$2b$10$bamnOjmuJ4HErU8B8yXcF.M278BsB/wpUF3IBdHyqD8Ih1nD/oe4q', 'admin', 0),
('Chuck', 'Norris', 'chuck@norris.fr', 'supermotdepasse', 'user', 0);


INSERT INTO "galerie" ("name", "user_id") VALUES
('test', 1);

INSERT INTO "photos" ("name", "galerie_id") VALUES
('photo1', 1);


COMMIT;

BEGIN;

--
-- PostGres avec le type serial n'incrémente pas automatiquement de façon implicite la séquence rattaché à la colonne !
-- Il faut donc mettre à jour la valeur courante de chacune des séquences en séléctionnant l'id maximum de chaque table
--
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('galerie_id_seq', (SELECT MAX(id) from "galerie"));
SELECT setval('photos_id_seq', (SELECT MAX(id) from "photos"));


COMMIT;


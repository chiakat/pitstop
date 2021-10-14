DROP DATABASE  toiletsandtap;
CREATE DATABASE toiletsandtap;
\c toiletsandtap;

-- ---
-- CREATE TABLES
-- ---
DROP TABLE toiletsandtap;
CREATE TABLE toiletsandtap (
  placeId varchar UNIQUE PRIMARY KEY,
  name text NOT NULL,
  location varchar NOT NULL,
  directions varchar,
  hours varchar,
  publicOrPrivate text,
  isAccessible boolean NOT NULL DEFAULT false,
  male boolean NOT NULL DEFAULT false,
  female boolean NOT NULL DEFAULT false,
  hasToiletPaper boolean NOT NULL DEFAULT false,
  hasSoap boolean NOT NULL DEFAULT false,
  hasChangingTable boolean NOT NULL DEFAULT false,
  unisex boolean NOT NULL DEFAULT false,
  isFree boolean NOT NULL DEFAULT false,
  needKey boolean NOT NULL DEFAULT false,
  isVerified boolean NOT NULL DEFAULT false,
  rating int NOT NULL DEFAULT 0,
  type text NOT NULL DEFAULT 'toilet'
);


INSERT INTO toiletsandtap VALUES (
  '123456',
  'Test Restroom',
  '123 Main st',
  'Around the corner',
  '24 hours',
  'public',
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  3,
  'toilet'
);
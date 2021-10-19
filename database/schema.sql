sqlite3 toiletsandtap.db;
-- ---
-- CREATE TABLES
-- ---
DROP TABLE toiletsandtap;
CREATE TABLE toiletsandtap (
  place_id varchar,
  status text NOT NULL DEFAULT 'OPERATIONAL',
  name text NOT NULL,
  address varchar,
  location varchar NOT NULL,
  latitude varchar NOT NULL,
  longitude varchar NOT NULL,
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
  user_ratings_total int NOT NULL DEFAULT 0,
  type text NOT NULL DEFAULT 'toilet'
);


INSERT INTO toiletsandtap VALUES (
  '123456',
  'Test Restroom',
  '{lat: 37.7749295, lng: -122.4194155}',
  37.7749295,
  -122.4194155,
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
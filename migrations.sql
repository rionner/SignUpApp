CREATE DATABASE email_sign_up_app;

\c email_sign_up_app
CREATE TABLE fans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);


FROM postgres:16

# Variables por defecto (puedes sobreescribir con .env)
ENV POSTGRES_DB=nestzero
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Carpeta para scripts iniciales
COPY ./init.sql /docker-entrypoint-initdb.d/

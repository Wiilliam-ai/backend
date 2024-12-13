# Pasos para levantar el proyecto

1. Clonar el repositorio
2. Instalar las dependencias

```bash
npm install
```

3. Si cuentas con docker levantar los contenedores

```
docker compose up -d
```

4. Entrar a la base de datos con el nombre fragote_db `http://localhost:8180`

```md
usuario: root
password: 123456
```

5. Ejecutar el script para crear la tabla

```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

6. Crea un archivo `.env` y dentro copia y pega el contenido del `.env.example` , los datos de este pueden variar si no tiene un usuario creado es requerido crearlo

7. Levantar el proyecto

```bash
npm run dev
```

# План подготовки к публикации на Timeweb Cloud

Инфраструктура будет использовать домен `app.unvrsm.ru` как основной, с проксированием запросов к `*.supabase.co` через `api.unvrsm.ru` для обхода сетевых ограничений.

## 1. Настройка доменов и CORS
- Установить `app.unvrsm.ru` как доверенный источник в Nginx и Supabase.
- Настроить `api.unvrsm.ru` для перенаправления трафика на `poapzmmpbwdcoldvofen.supabase.co`.
- Добавить `app.unvrsm.ru` в белый список CORS в конфигурации Nginx.

## 2. Конфигурация развертывания (Docker)
- Создать `Dockerfile` для многоэтапной сборки приложения.
- Создать `nginx.conf` для обслуживания SPA и проксирования API.
- Создать `docker-compose.yml` с сервисами `app` и `edge`.
- Настроить `edge` прокси с поддержкой страницы технических работ (`maintenance.html`).

## 3. Окружение и переменные
- Создать `.env.production` с URL прокси: `VITE_SUPABASE_URL=https://api.unvrsm.ru`.
- Убедиться, что `import.meta.env.VITE_SUPABASE_URL` используется во всем приложении.

## 4. Обновление документации
- Заменить временные ссылки "Добавить ссылку на документ" на "Документация и регламенты".
- Обновить ссылки на `unvrsm.ru/legal`.

## Технические детали
- **Docker Compose**: Внешний порт 8082 (edge).
- **Healthcheck**: `GET /__edge_health`.
- **DNS**: `A` записи для `unvrsm.ru`, `www.unvrsm.ru`, `api.unvrsm.ru`, `app.unvrsm.ru`.
- **SSL**: Let's Encrypt для всех доменов в панели Timeweb.

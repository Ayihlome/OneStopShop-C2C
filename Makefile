up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

db-shell:
	docker compose exec db psql -U postgres -d onestopshop

backend-shell:
	docker compose exec backend sh

reset-db:
	docker compose down -v && docker compose up --build

prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

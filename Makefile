.PHONY: up-dev
up-dev:
	docker compose -f docker-compose.dev.yml up -d && yarn start:dev

.PHONY: up-prod
up-prod:
	docker compose up --build -d

.PHONY: down
down:
	docker compose down

.PHONY: reset
reset:
	docker volume rm $$(docker volume ls -q) && docker rmi $$(docker images -q)
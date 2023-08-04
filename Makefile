

NEST_CONTAINER=nest_container
REACT_CONTAINER=react_container
POSTGRES_CONTAINER=postgres_container

all:
	docker-compose up -d --build

down:
	docker-compose down

stop:
	docker stop $(NEST_CONTAINER) $(REACT_CONTAINER) $(POSTGRES_CONTAINER) || true

rm:
	docker rm $(NEST_CONTAINER) $(REACT_CONTAINER) $(POSTGRES_CONTAINER) || true

prune:
	docker system prune -a

re: down all

fclean: stop rm prune
	
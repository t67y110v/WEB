# Tech Stack
- [Go] (https://go.dev)
- [React] (https://ru.reactjs.org/)
- [PostgreSQL] (https://www.postgresql.org)
- [Docker] (https://www.docker.com/)
- [Fiber] (https://github.com/gofiber/fiber)
- [TypeScript] (https://www.typescriptlang.org/)
- [Vite] (https://vitejs.dev/)
- [Mantine] (https://mantine.dev/)
- [Bootstrap 5] (https://getbootstrap.com/)



# Backend go-fiber
## Структура директории
```   
├── cmd
│   └── server
│       └── main.go
├── config
│   └── configs.toml
├── go.mod
├── go.sum
├── internal
│   └── app
│       ├── model
│       │   └── model.go
│       ├── server
│       │   ├── config.go
│       │   ├── server.go
│       │   └── webserver.go
│       └── store
│           ├── errors.go
│           ├── repository.go
│           ├── store.go
│           └── sqlstore
│               └── store.go    
```

# Frontend React-TypeScript-Vite-Bootstrap-Mantine

## Структура директории
```
├── app
│   ├── database
│   │   ├── schema
│   │   │   └── article.go
│   │   └── seeder
│   │       └── article_seeder.go
│   ├── middleware
│   │   ├── register.go
│   │   └── token
│   │       └── token.go
│   ├── module
│   │   └── article
│   │       ├── article_module.go
│   │       ├── controller
│   │       │   ├── article_controller.go
│   │       │   ├── article_controller_mock.go
│   │       │   └── controller.go
│   │       ├── repository
│   │       │   ├── article_repository.go
│   │       │   └── article_repository_mock.go
│   │       ├── request
│   │       │   └── article_request.go
│   │       └── service
│   │           ├── article_service.go
│   │           └── article_service_mock.go
│   └── router
│       └── api.go
├── build
│   ├── Dockerfile
│   └── DockerfileAir
├── cmd
│   └── example
│       ├── generate.go
│       └── main.go
├── config
│   └── example.toml
├── docker-compose.yaml
├── go.mod
├── go.sum
├── internal
│   └── bootstrap
│       ├── database
│       │   └── database.go
│       ├── logger.go
│       └── webserver.go
├── LICENSE
├── Makefile
├── README.md
├── storage
│   ├── ascii_art.txt
│   ├── private
│   │   └── example.html
│   ├── private.go
│   └── public
│       └── example.txt
└── utils
    ├── config
    │   └── config.go
    ├── response
    │   ├── response.go
    │   └── validator.go
    └── utils.go
```
## Использование 
Для запуска использовать команды:

```go mod download```

```go run cmd/example/main.go```
### Docker
```shell
docker-compose build
docker-compose up

CUSTOM="Air" docker-compose up # Использовать с  Air
```


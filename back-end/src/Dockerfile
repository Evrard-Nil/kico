FROM golang:1.10 AS build
WORKDIR /go/src
COPY go ./github.com/evrard-nil/kico/back-end/src/go
COPY main.go .

ENV CGO_ENABLED=0
RUN go get -d -v ./...

RUN go build -a -installsuffix cgo -o openapi .

FROM alpine AS runtime
COPY --from=build /go/src/openapi ./
EXPOSE 8080/tcp
ENTRYPOINT ["./openapi"]

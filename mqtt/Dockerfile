FROM golang:1.10.3

ENV GOPATH /usr/go
RUN mkdir $GOPATH
RUN mkdir -p $GOPATH/src/github.com/waziup/mqtt-server

RUN go get github.com/mongodb/mongo-go-driver/bson
RUN go get github.com/mongodb/mongo-go-driver/mongo
RUN go get github.com/j-forster/mqtt
RUN go get github.com/j-forster/waziup-mqtt

COPY src/*.go $GOPATH/src/github.com/waziup/mqtt-server
RUN go install github.com/waziup/mqtt-server

EXPOSE 1883
ENTRYPOINT [ "/usr/go/bin/mqtt-server" ]

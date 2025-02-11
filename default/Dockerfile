FROM alpine:latest

RUN mkdir /defaults
ADD . /defaults
RUN chmod +x /defaults/copy.sh

CMD [ "/defaults/copy.sh" ]
FROM alpine:latest

RUN mkdir /defaults
ADD . /defaults
RUN chmod +x /defaults/copy.sh
RUN dos2unix /defaults/copy.sh

CMD [ "/bin/sh", "/defaults/copy.sh" ]
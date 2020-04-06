FROM node:10.19.0


WORKDIR /app
COPY main.js /app/
COPY package.json /app/

RUN set -x \
    && npm install

CMD ["node_modules/naught/lib/main.js", "start", "--worker-count", "2", "--daemon-mode", "false", "--remove-old-ipc", "true", "--log", "-", "--stdout", "-", "--stderr", "-", "main.js"]

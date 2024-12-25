# playwright image を使用。なお、v1.49.1 部分はplaywright.config.ts のバージョンに合わせる。
FROM mcr.microsoft.com/playwright:v1.49.1-noble

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install
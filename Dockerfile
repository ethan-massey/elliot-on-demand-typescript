FROM node:latest AS build
COPY src /src/
COPY package.json .
COPY tsconfig.json .
RUN yarn install
RUN yarn run tsc
FROM node:latest
COPY --from=build build /build/
COPY --from=build node_modules /node_modules/
COPY public /public/
COPY src/view /src/view/
CMD ["node", "build/index.js"]
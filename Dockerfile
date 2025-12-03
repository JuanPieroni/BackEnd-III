FROM node:22.15.0-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS production
RUN npm ci --only=production
COPY ./src ./src
EXPOSE 8080
ENV NODE_ENV=production
ENV PORT=8080
ENV MONGO_URI=mongodb+srv://SeisDuro:Atlgla36%2A@cluster0.bvo0gcz.mongodb.net/AdoptMe?retryWrites=true&w=majority
CMD ["npm", "start"]

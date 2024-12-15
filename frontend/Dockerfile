
FROM node


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 4000

# Запускаем приложение
CMD ["npm", "start"]

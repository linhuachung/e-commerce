#Install the dependencies
npm install
#Build the application
RUN npm run build
#Migration sql to tables postgresql
npm run migration:run
# start application environment:dev
npm run start:dev
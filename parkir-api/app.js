const App = require('./app/index');

const port = process.env.PORT || 3000;

App.listen(port);
console.info('[APP] API-PARKING STARTED on ' + port);

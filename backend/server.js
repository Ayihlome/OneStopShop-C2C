const express = require('express');
const config = require('./config');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.get('/', (req, res) => res.send('OneStopShop-C2C Backend'));

// generic error handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

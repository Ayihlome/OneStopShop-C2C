require('dotenv').config();
const express = require('express');
const config = require('./config');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));

app.use('/api', routes);

app.get('/', (req, res) => res.send('OneStopShop-C2C Backend'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

const express = require('express');
const sequelize = require('./config/database');
const logger = require('./config/logger');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/', express.static('files/'));

app.use('/auth', authRoutes);
app.use('/user/', userRoutes);
app.use('/quotation/', quotationRoutes);
app.use('/item/', itemRoutes);
app.use('/profile/', profileRoutes);
app.use('/dashboard/', dashboardRoutes);


sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

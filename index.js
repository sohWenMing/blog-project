const { app } = require('./app');
const { info } = require('./utils/logger');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    info(`Listening on port ${port}`);
});


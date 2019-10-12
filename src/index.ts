// tslint:disable-next-line: no-reference
///<reference path="./typings/shims.d.ts" />

import * as express from 'express';
import * as logger from 'morgan';
import { router } from './router';
import { createConnection } from './db';
import * as hbs from 'hbs';
import cookieSession = require('cookie-session');
import * as bodyParser from 'body-parser';
import { startMessageQueueHandler } from './messageQueueHandler';

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(cookieSession({
    name: 'session',
    keys: ['authToken'],
}));

app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(logger('tiny'));

app.use('/', router);

app.use(express.static('public'));

(async () => {
    await createConnection();

    startMessageQueueHandler();

    const port = process.env.PORT || 12180;
    app.listen(port);
    console.log('Listening on port', port);
})().catch((e) => console.error(e.stack));

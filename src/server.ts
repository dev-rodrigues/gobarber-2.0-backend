import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(bodyParser.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('-------------------------------------------------');
    console.log('---------- SERVER STARTED ON PORT 3333 ----------');
    console.log('-------------------------------------------------');
});

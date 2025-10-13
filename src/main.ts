import "reflect-metadata";

require('dotenv').config()
const express = require('express');
const app = express();

const PORT: string = process.env.PORT ?? '3000';

import { router } from "./main.route";

app.use(router);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

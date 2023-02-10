
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {router} from "../routes/routes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentdirec = path.dirname(__dirname)
export const app = express();

app.use(express.json())
app.set("view engine","ejs")
app.use(express.static(path.join(__parentdirec,'static')))
app.use('/',router)

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);




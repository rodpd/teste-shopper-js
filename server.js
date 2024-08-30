import express from "express"
import db from './config/Sequelize.js'
import { GetMeasures } from './routes/GetMeasures.js'
import { PostMeasure } from './routes/PostMeasure.js'
import { UpdateMeasure } from './routes/UpdateMeasure.js'
import dotenv from 'dotenv';


const app = express();

app.use(express.json());

const getMeasures = new GetMeasures();
const postMeasure = new PostMeasure();
const updateMeasure = new UpdateMeasure();

app.get('/:customer_code/list', getMeasures.getAll);
app.post('/upload', postMeasure.create);
app.patch('/confirm', updateMeasure.update);

dotenv.config();
db.sync()

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
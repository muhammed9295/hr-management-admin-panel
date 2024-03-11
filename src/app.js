import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/test', (req,res)=>{
    res.send('test');
})

export {app};
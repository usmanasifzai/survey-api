import express from 'express';
import QuestionsRouter from './routers/QuestionsRouter';
import SurveysRouter from './routers/SurveysRouter';
import ResponseRouter from './routers/ResponseRouter';
import pool from './dbconfig/dbconnection';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

class Server {
  public app;

  constructor () {
    dotenv.config();
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbPoolConnection();
  }

  private routerConfig () {
    this.app.use('/questions', QuestionsRouter);
    this.app.use('/surveys', SurveysRouter);
    this.app.use('/user_responses', ResponseRouter);
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended:true }));
    this.app.use(bodyParser.json({ limit: '1mb' }));
  }

  private dbPoolConnection() {
    pool.query("SELECT NOW()", (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('Connection has been established successfully')
      }
    })
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
        this.app.listen(port, () => {
            resolve(port);
        }).on('error', (err: Object) => reject(err));
    });
  }
}

export default Server;

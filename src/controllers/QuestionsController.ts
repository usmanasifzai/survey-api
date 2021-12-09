import client from '../dbconfig/dbconnection';

class QuestionsController {
  public async index(req, res) {
    try {
      let response = await client.query('select * FROM questions');
      res.status(200).json({ questions: response.rows });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default QuestionsController;

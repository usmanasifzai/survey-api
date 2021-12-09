import client from '../dbconfig/dbconnection';

class ResponseController {
  public async userResponse(req, res) {
    const { email } = req.query;

    try {
      let userResponses = await client.query('select questions.title as question, value::jsonb-> $2 as answer, res.created_at as submitted_at from responses as res inner join questions on res.question_id = questions.id where res.email = $1', [email, 'answer']);
      res.status(200).json({ userResponse: userResponses.rows });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default ResponseController;

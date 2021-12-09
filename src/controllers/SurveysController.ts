import client from '../dbconfig/dbconnection';
import validateQuestionResponse from '../services/validateQuestionResponse';

class SurveysController {
  public async create(req, res) {
    const { email, questionId, answer } = req.body;

    let valid = await validateQuestionResponse(questionId, answer);

    if (!valid) {
      return res.status(422).json({ message: 'Please submit question response according to config' });
    }

    try {
      await client.query('insert into responses (email, question_id, value) values($1, $2, $3)', [email, questionId, {answer}]);
      res.status(200).json({ message: 'Survey submitted successfully' });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default SurveysController;

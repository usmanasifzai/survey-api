import client from '../dbconfig/dbconnection';

export default async function validateResponse(questionId, answer) {
  try {
    let question = await client.query('select * FROM questions where id = $1', [questionId]);
    let config = question.rows[0]?.config

    if (!config) return false;

    switch(config.type) {
      case 'text':
        return typeof answer == 'string' && answer.length <= config.limit
      case 'boolean':
        return typeof answer == 'boolean'
      case 'radio':
        return config.options.includes(answer)
      default:
        return false;
    }
  } catch (e) {
    console.log("test");
    return false;
  }
}


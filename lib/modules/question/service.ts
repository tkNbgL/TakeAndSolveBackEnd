import { IQuestion } from "./model";
import question from './schema';

export default class QuestionService {

    public createQuestion(question_params: IQuestion, callback: any) {
        const _session = new question(question_params);
        _session.save(callback);
    }

    public filterQuestion(query: any, callback: any) {
        question.findOne(query, callback);
    }

    public updateQuestion(question_params: IQuestion, callback: any) {
        const query = { _id: question_params._id };
        question.findOneAndUpdate(query, question_params, callback);
    }

    public deleteQuestion(_id: String, callback: any) {
        const query = { _id: _id};
        question.deleteOne(query, callback);
    }
}
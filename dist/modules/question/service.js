"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class QuestionService {
    createQuestion(question_params, callback) {
        const _session = new schema_1.default(question_params);
        _session.save(callback);
    }
    filterQuestion(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updateQuestion(question_params, callback) {
        const query = { _id: question_params._id };
        schema_1.default.findOneAndUpdate(query, question_params, callback);
    }
    deleteQuestion(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = QuestionService;

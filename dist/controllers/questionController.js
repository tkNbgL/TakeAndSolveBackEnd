"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/question/service");
class QuestionController {
    constructor() {
        this.question_service = new service_2.default();
    }
    create_question(req, res) {
        if (req.body.name && req.body.description && req.body.examples.input && req.body.examples.output) {
            const question_params = {
                name: req.body.name,
                description: req.body.description,
                examples: req.body.examples,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New question created'
                    }]
            };
            this.question_service.createQuestion(question_params, (err, question_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create question successfull', question_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_question(req, res) {
        if (req.params.id) {
            const question_filter = { _id: req.params.id };
            this.question_service.filterQuestion(question_filter, (err, question_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('get question successfull', question_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_question(req, res) {
        if (req.params.id
            && req.body.name || req.body.description || req.body.examples.input || req.body.examples.output) {
            const question_filter = { _id: req.params.id };
            this.question_service.filterQuestion(question_filter, (err, question_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (question_data) {
                    question_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'question data updated'
                    });
                    const question_params = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : question_data.name,
                        description: req.body.description ? req.body.description : question_data.description,
                        examples: req.body.examples ? req.body.examples : question_data.examples,
                        modification_notes: question_data.modification_notes
                    };
                    this.question_service.updateQuestion(question_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update question successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_question(req, res) {
        if (req.params.id) {
            this.question_service.deleteQuestion(req.params.id, (err, delete_question) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_question.deletedCount !== 0) {
                    service_1.successResponse('delete user successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.QuestionController = QuestionController;

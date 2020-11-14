import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IQuestion } from '../modules/question/model';
import QuestionService from '../modules/question/service';
import e = require('express');

export class QuestionController {
    private question_service: QuestionService = new QuestionService();

    public create_question(req: Request, res: Response) {
        if (req.body.name && req.body.description && req.body.examples.input && req.body.examples.output) {
            const question_params: IQuestion = {
                name: req.body.name,
                description: req.body.description,
                examples: req.body.examples,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New question created'
                }]
            };

            this.question_service.createQuestion(question_params, (err: any, question_data: IQuestion) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create question successfull', question_data, res);
                }
            });
            
        } else {
            insufficientParameters(res);
        }
    }

    public get_question(req: Request, res: Response) {
        if (req.params.id) {
            const question_filter = { _id: req.params.id };
            this.question_service.filterQuestion(question_filter, (err: any, question_data: IQuestion) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get question successfull', question_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_question(req: Request, res: Response) {
        if (req.params.id
            && req.body.name || req.body.description || req.body.examples.input || req.body.examples.output) {
                const question_filter = { _id: req.params.id };
                this.question_service.filterQuestion(question_filter, (err: any, question_data: IQuestion) => {
                    if (err) {
                        mongoError(err, res);
                    } else if (question_data) {
                        question_data.modification_notes.push({
                            modified_on: new Date(Date.now()),
                            modified_by: null,
                            modification_note: 'question data updated'
                        });
                        const question_params: IQuestion = {
                            _id: req.params.id,
                            name: req.body.name ? req.body.name : question_data.name,
                            description: req.body.description ? req.body.description : question_data.description,
                            examples: req.body.examples ? req.body.examples : question_data.examples,
                            modification_notes: question_data.modification_notes
                        };

                        this.question_service.updateQuestion(question_params, (err:any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse('update question successfull', null, res);
                            }
                        });
                    } else {
                        failureResponse('invalid user', null, res);
                    }
                });
            } else {
                insufficientParameters(res);
            }
    }

    public delete_question(req: Request, res: Response) {
        if (req.params.id) {
            this.question_service.deleteQuestion(req.params.id, (err: any, delete_question) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_question.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRoutes = void 0;
const questionController_1 = require("../controllers/questionController");
class QuestionRoutes {
    constructor() {
        this.question_controller = new questionController_1.QuestionController();
    }
    route(app) {
        app.post('/api/question', (req, res) => {
            this.question_controller.create_question(req, res);
        });
        app.get('/api/question/:id', (req, res) => {
            this.question_controller.get_question(req, res);
        });
        app.put('/api/question/:id', (req, res) => {
            this.question_controller.update_question(req, res);
        });
        app.delete('/api/question/:id', (req, res) => {
            this.question_controller.delete_question(req, res);
        });
    }
}
exports.QuestionRoutes = QuestionRoutes;

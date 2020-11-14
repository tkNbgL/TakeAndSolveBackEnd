import { Application, Request, Response} from 'express';
import { QuestionController } from '../controllers/questionController'

export class QuestionRoutes {

    private question_controller: QuestionController = new QuestionController();

    public route(app: Application) {
        app.post('/api/question', (req: Request, res: Response) => {
            this.question_controller.create_question(req, res);
        });

        app.get('/api/question/:id', (req: Request, res: Response) => {
            this.question_controller.get_question(req, res);
        });

        app.put('/api/question/:id', (req: Request, res: Response) => {
            this.question_controller.update_question(req, res);
        });

        app.delete('/api/question/:id', (req: Request, res: Response) => {
            this.question_controller.delete_question(req, res);
        });
    }
}
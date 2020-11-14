import * as mongoose from 'mongoose';
import { ModificationNote} from '../common/model';
import { ExampleAnswers } from "../example/model";

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    description: String,
    examples: [ExampleAnswers],
    modification_notes: [ModificationNote]
});

export default mongoose.model('question', schema);
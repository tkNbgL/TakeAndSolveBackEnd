import { ModificationNote } from "../common/model";
import { ExampleAnswers } from "../example/model";

export interface IQuestion {
    _id?: String;
    name: String;
    description: String;
    examples: ExampleAnswers[];
    modification_notes: ModificationNote[]
}
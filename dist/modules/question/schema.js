"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const model_2 = require("../example/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    name: String,
    description: String,
    examples: [model_2.ExampleAnswers],
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('question', schema);

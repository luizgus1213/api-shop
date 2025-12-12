"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const controller = (req, res) => {
    res.json({ mensagem: 'Toddynho' });
};
app.get('/toddynho', controller);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

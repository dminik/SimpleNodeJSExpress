"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Simple route for the calculator API
app.get('/api/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;
    if (!num1 || !num2 || !operation) {
        return res.status(400).send('Missing parameters');
    }
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let result;
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                return res.status(400).send('Cannot divide by zero');
            }
            result = number1 / number2;
            break;
        default:
            return res.status(400).send('Invalid operation');
    }
    res.send({ result });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Started Calculator API running at http://localhost:${port}`);
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map
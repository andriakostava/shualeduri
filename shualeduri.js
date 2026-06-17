const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "expenses.json");

function readExpenses() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeExpenses(expenses) {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

function create(category, price) {
    if (price < 10) {
        throw new Error("Price cannot be less than 10");
    }

    const expenses = readExpenses();

    const newExpense = {
        id: Date.now(),
        category,
        price: Number(price),
        createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    writeExpenses(expenses);

    return newExpense;
}

function getAll() {
    return readExpenses();
}

function getById(id) {
    return readExpenses().find(e => e.id == id);
}

function remove(id) {
    const expenses = readExpenses();
    const index = expenses.findIndex(e => e.id == id);

    if (index === -1) return null;

    const deleted = expenses.splice(index, 1)[0];
    writeExpenses(expenses);
    return deleted;
}

function update(id, category, price) {
    const expenses = readExpenses();
    const expense = expenses.find(e => e.id == id);

    if (!expense) return null;

    if (category) expense.category = category;
    if (price) {
        if (price < 10) throw new Error("Price cannot be less than 10");
        expense.price = Number(price);
    }

    writeExpenses(expenses);
    return expense;
}

function searchByDate(date) {
    return readExpenses().filter(
        e => e.createdAt.slice(0, 10) === date
    );
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
    searchByDate
};
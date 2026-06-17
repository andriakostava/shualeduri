program
    .command("add")
    .requiredOption("-c, --category <category>")
    .requiredOption("-p, --price <price>")
    .action((options) => {
        try {
            console.log(expense.create(options.category, options.price));
        } catch (err) {
            console.log(err.message);
        }
    });
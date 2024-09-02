const ejs = require('ejs');
const path = require('path');

exports.handler = async (event, context) => {
    const filePath = path.join(__dirname, '../views/index.ejs');
    const template = fs.readFileSync(filePath, 'utf-8');
    const html = ejs.render(template, { /* Your template variables here */ });

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html,
    };
};

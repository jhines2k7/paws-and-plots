const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

app.get('/', (req, res) => {
    res.redirect('/the-healing-bond');
});

app.get('/:slug', (req, res) => {
    fs.readFile(`./stories/${req.params.slug}.json`, 'utf8', (err, data) => {
        if (err) {
            console.error('An error occurred:', err);
            return;
        }

        const jsonData = JSON.parse(data);
        res.render('index', { jsonData, toTitleCase });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

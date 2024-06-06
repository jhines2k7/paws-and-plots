const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define a route
// Define a route
app.get('/', (req, res) => {
    res.render('index', {
        message: 'Goodbye, World!',
        title: 'Paws and Plots',
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

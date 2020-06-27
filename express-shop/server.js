const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/', (req, res, next)=> {
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); //first path adds a kind of prefix. Thus, it implicitly adds admin in the path inside adminRoutes.
app.use(shopRoutes);

//Way To Pass Data In Templating Engine Does Not Change
app.use((req, res, next) => {
    res.status('404').render('404', { pageTitle: 'Page Not Found' });
})

app.listen(3000);
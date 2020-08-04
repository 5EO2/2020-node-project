module.exports = (app, Book) => {
    // index page
    app.get('/', (req, res) => {
        Book.find((err, books) => {
            const cnt = books.length;
            const today = new Date();
            if(err) return res.status(500).send({ error: 'database failure' });
            res.render('index', {cnt, today});
        });
    });

    // list page
    app.get('/list', (req, res) => {
        Book.find((err, books) => {
            const object = books;
            if(err) return res.status(500).send({ error: 'database failure' });
            res.render('list', {object});
        });
    });

    // add_rendering page
    app.get('/add', (req, res) => {
        res.render('add');
    });
    
    // delete_rendering page
    app.get('/delete', (req, res) => {
        res.render('delete');
    });

    // addresult page
    app.get('/addresult', (req, res) => {
        const title = req.query.title;
        const author = req.query.author;
        res.render('add_result',{title, author});
    });

    // deleteresult page
    app.get('/delresult', (req, res) => {
        const title = req.query.title;
        const author = req.query.author;
        res.render('del_result',{title, author});
    });

    // dev information page
    app.get('/dev', (req, res) => {
        Book.find((err, books) => {
            const cnt = books.length;
            const today = new Date();
            if(err) return res.status(500).send({ error: 'database failure' });
            res.render('dev', {cnt, today});
        });
    });

    // add_api
    app.post('/api/books', (req, res) => {
        const book = new Book();
        book.title  = req.query.title;
        book.author = req.query.author;
        const title  = req.query.title;
        const author = req.query.author;
        book.save((err) => {
            if(err){
                console.error(err);
                res.json({ result: 0 });
                return;
            }else{
                res.json({title , author });
            }
        });
    });

    // delete_api
    app.delete('/api/books/:book_id', (req, res) => {
        const book_id = req.params.book_id;
        if(req.params.book_id == "all") {
            Book.deleteMany({}, function(err, output){
                if(err) return res.status(500).json({ error: "database failure" });
                res.json("all");
                res.status(204);
            });
        } else {
            Book.findOne({_id : book_id}, {_id :1, title:1, author:1},(err, result) =>{
                if(err) return res.status(500).json({ error: "database failure" });
                else if(result == null){
                    return res.status(500).json({ error: "no book" });
                }
                else {
                    res.json(result);
                    Book.deleteOne({ _id : result._id }, function(err, output){
                        if(err) return res.status(500).json({ error: "database failure" });
                    });
                };
            });
            
        };
    }); 
}; 
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) throw err;
        conn.query('SELECT * FROM customer', (i_err, results) => {
            if(i_err) throw i_err;
            // console.log(results);
            res.render('customers', {
                data: results
            });
        });
    });
};

controller.save = (req, res) => {
    data = req.body;
    req.getConnection((err, conn) => {
        if(err) throw err;
        conn.query('INSERT INTO customer set ?', [data], (i_err, results) => {
            // console.log(results);
            res.redirect('/');
        });
    })
};

controller.redirect2Update = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) throw err;
        conn.query('SELECT * FROM customer WHERE id = ?', [req.params.id], (i_err, results) => {
            res.render('customer-edit', {
                data: results[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, req.params.id], (i_err, results) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) throw err;
        conn.query(`DELETE FROM customer WHERE id = ${req.params.id}`, (i_err, results) => {
            if(i_err) throw err;
            res.redirect('/');
        });
    });
};

module.exports = controller;
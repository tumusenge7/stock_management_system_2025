const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()
app.use(cors())
app.use(express.json())
const db = require('./db')
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)"
        const hash = await bcrypt.hash(password, 10)
        const values = [name, email, hash]
        db.query(sql, values, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    }
    catch (err) {
        console.log(err)
    }
})
/*login */
app.post('/login', (req, res) => {
    const { name, email, password } = req.body;
    try {
        const sql = "SELECT * FROM users WHERE email=?"
        db.query(sql, [email], async (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length === 0) {
                return res.status(404).json()
                return res.json('user not found')
            }
            const user = data[0]
            const macth = await bcrypt.compare(password, user.password)
            if (!macth) {
                return res.status(401).json('password not macth')
            }
            return res.status(200).json('login success')
        })
    }
    catch (err) {
        console.log(err)
    }
})
app.post('/stock', (req, res) => {
    const { product_name, quantity, price } = req.body;
    const values = [product_name, quantity, price]
    const sql = "INSERT INTO stock(product_name,quantity,price) VALUES(?,?,?)";
    db.query(sql, values, (err, data) => {
        if (err) throw err;
        return res.json(data)
    })
})
app.get('/stock', (req, res) => {
    const sql = "SELECT * FROM stock"
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data)
    })
})
app.delete('/stock/:id', (req, res) => {
    const { id } = req.params;
    // delete stockin records first
    const deleteStockin = "DELETE FROM stockin WHERE stock_id=?";
    db.query(deleteStockin, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        // delete stockout records
        const deleteStockout = "DELETE FROM stockout WHERE stock_id=?";
        db.query(deleteStockout, [id], (err2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).json(err2);
            }
            // now delete product
            const deleteStock = "DELETE FROM stock WHERE id=?";
            db.query(deleteStock, [id], (err3, data) => {
                if (err3) {
                    console.log(err3);
                    return res.status(500).json(err3);
                }
                return res.json({
                    message: "Deleted successfully"
                });
            });
        });
    });
});
app.put('/stock/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, quantity, price } = req.body;
    const values = [product_name, quantity, price, id]
    const sql = "UPDATE stock SET product_name=?, quantity=?,price=? WHERE id=?"
    db.query(sql, values, (err, data) => {
        if (err) throw err;
        return res.json(data)
    })
})
app.post('/stockin', (req, res) => {
    const { stock_id, quantity, price } = req.body;
    const total = quantity * price;
    // save stockin record
    const sql = "INSERT INTO stockin(stock_id, quantity, price, total) VALUES(?,?,?,?)";
    const values = [stock_id, quantity, price, total]
    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        // increase stock quantity
        const updateSql = "UPDATE stock SET quantity = quantity + ? WHERE id=?";
        db.query(updateSql, [quantity, stock_id], (err2) => {
            if (err2) return res.status(500).json(err2);
            return res.json("Stockin success");
        });
    });
});
app.post('/stockout', (req, res) => {
    const { stock_id, quantity, price } = req.body;
    const total = quantity * price;
    // save stockout record
    const sql = "INSERT INTO stockout(stock_id, quantity, price, total) VALUES(?,?,?,?)";
    const values = [stock_id, quantity, price, total]
    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);

        // decrease stock quantity
        const updateSql = "UPDATE stock SET quantity = quantity - ? WHERE id=?";
        db.query(updateSql, [quantity, stock_id], (err2) => {
            if (err2) return res.status(500).json(err2);
            return res.json("Stockout success");
        });
    });
});
app.get('/stockin', (req, res) => {
    const sql = ` SELECT si.*, s.product_name FROM stockin si JOIN stock s ON si.stock_id = s.id ORDER BY si.id DESC `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});
app.get('/stockout', (req, res) => {
    const sql = `SELECT so.*, s.product_name FROM stockout so JOIN stock s ON so.stock_id = s.id ORDER BY so.id DESC`;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});
app.listen(5000, (req, res) => {
    console.log("server listening")
})
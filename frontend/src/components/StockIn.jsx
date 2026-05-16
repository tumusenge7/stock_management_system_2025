import React, { useState, useEffect } from 'react'
import api from '../pages/Api'

function StockIn() {

    const [stocks, setStocks] = useState([])
    const [inputs, setInputs] = useState({
        stock_id: '',
        quantity: '',
        price: ''
    })

    // fetch stock list (for dropdown)
    useEffect(() => {
        api.get('/stock')
            .then(res => setStocks(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        api.post('/stockin', inputs)
            .then(() => {
                alert("Stockin success")

                setInputs({
                    stock_id: '',
                    quantity: '',
                    price: ''
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div>

            <h2>Stock In</h2>

            <form onSubmit={handleSubmit}>

                <select
                    value={inputs.stock_id}
                    onChange={(e) => setInputs({ ...inputs, stock_id: e.target.value })} >
                    <option value="">Select Product</option>
                    {stocks.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.product_name}
                        </option>
                    ))}
                </select>

                <input type="number" placeholder="Quantity" value={inputs.quantity} onChange={(e) => setInputs({ ...inputs, quantity: e.target.value })} />

                <input type="number" placeholder="Price" value={inputs.price}
                    onChange={(e) =>
                        setInputs({ ...inputs, price: e.target.value })
                    }
                />

                <button type="submit">Stock In</button>
            </form>

        </div>
    )
}

export default StockIn
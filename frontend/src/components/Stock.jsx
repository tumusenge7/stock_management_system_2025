import React, { useEffect, useState } from 'react'
import api from '../pages/Api'
import { useNavigate } from 'react-router-dom'

function Stock() {
    const [products, setProducts] = useState({
        product_name: '',
        quantity: '',
        price: ''
    })

    const [values, setValues] = useState([])
    const navigate = useNavigate()
    const fetchProducts = () => {
        api.get('/stock')
            .then((res) => setValues(res.data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/stock', products)
            .then((res) => {
                setProducts({
                    product_name: '',
                    quantity: '',
                    price: ''
                })
                fetchProducts()
            })
    }


    const handleDelete = (id) => {
        api.delete(`/stock/${id}`)
            .then(() => {
                fetchProducts()
            })
            .catch(err => console.log(err))
    }
    return (

        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    product_name: <input type="text" name='product_name' value={products.product_name} onChange={(e) => setProducts({ ...products, product_name: e.target.value })} />
                    quantity: <input type="number" name="quantity" value={products.quantity} onChange={(e) => setProducts({ ...products, quantity: e.target.value })} />
                    price: <input type="number" name="price" value={products.price} onChange={(e) => setProducts({ ...products, price: e.target.value })} />
                    <button>add product</button>
                </form>
            </div>
            <table border={1}>

                <thead>
                    <tr>
                        <th>id</th>
                        <th>product_name</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        values.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => navigate('/update', { state: product })}>edit</button>
                                    <button onClick={() => handleDelete(product.id)}>delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Stock
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../pages/Api'
function Update() {
    const navigate = useNavigate()
    const location = useLocation()
    const product = location.state
    const [inputs, setIputs] = useState({
        product_name: product.product_name,
        quantity: product.quantity,
        price: product.price
    })
    const hanldleUpdate = async (e) => {
        e.preventDefault()
        try {
            api.put(`/stock/${product.id}`, inputs)
            alert('product updated')
            navigate('/stock')

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>update form</h1>
            <div>
                <form onSubmit={hanldleUpdate}>
                    product_name: <input type="text" name='product_name' value={inputs.product_name} onChange={(e) => setIputs({ ...inputs, product_name: e.target.value })} />
                    quantity: <input type="number" name="quantity" value={inputs.quantity} onChange={(e) => setIputs({ ...inputs, quantity: e.target.value })} />
                    price: <input type="number" name="price" value={inputs.price} onChange={(e) => setIputs({ ...inputs, price: e.target.value })} />
                    <button>update product</button>
                </form>
            </div>
        </div>
    )
}

export default Update
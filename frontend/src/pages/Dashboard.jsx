import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
function Dashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>     stock management system</h1>

            <div>
                <button ><Link to="/stock">stock</Link></button>
                <button> <Link to='/stockIn'>stockin</Link></button>
                <button>StockOut</button>
                <button>Report</button>
            </div>
            <button>logout</button>
        </div>
    )
}

export default Dashboard
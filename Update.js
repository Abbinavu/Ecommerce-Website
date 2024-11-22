import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { FiEdit } from "react-icons/fi";
import './Update.css'
import { Link } from "react-router-dom";

const Update = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/store')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const DeleteItems = (id) => {
        fetch(`http://localhost:5000/stores/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Deleted successfully");
                setProducts((prevProducts) => prevProducts.filter((item) => item._id !== id));
            })
            .catch((error) => console.error("Error deleting item:", error));
    };

    return (
        <div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.desc}</td>
                            <td>{item.price}</td>
                            <td><img src={item.img} width={"150px"} height={"150px"} alt=''/></td>
                            <td>
                                <button onClick={() => DeleteItems(item._id)}>Delete</button>
                                <Link to={`/edit/${item._id}`}><button>Edit</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Update;

import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";

const Edit = () => {
    const{id} = useParams();
    const[productData, setproductData] = useState({
        title:"",
        desc:"",
        price:"",
        img:"",
    });

    useEffect(() => {
        fetch(`http://localhost:5000/stored/${id}`)
        .then((res) => res.json())
        .then((data) => setproductData(data));
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const price = form.price.value;
        const img = form.img.value;

        const product = {title,img,desc,price};
        console.log(product);

        fetch(`http://localhost:5000/all/${id}`, {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(product)
        })
        .then((res) => res.json())
        .then((data) => {
            toast.success("Product updated successfully");
            window.location.href = '/update';
        });
    }

    return(
        <>
        <ToastContainer/>
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                    <h2>EDIT</h2>
                    <div>
                        <label value="title">Title</label>
                        <input type="text" name="title" defaultValue={productData.title}/>
                    </div>
                    <div>
                        <label value="desc">Desc</label>
                        <input type="text" name="desc" defaultValue={productData.desc}/>
                    </div>
                    <div>
                        <label value="price">Price</label>
                        <input type="number" name="price" defaultValue={productData.price}/>
                    </div>
                    <div>
                        <label value="img">Image</label>
                        <input type="img" name="img" defaultValue={productData.img}/>
                    </div>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Edit
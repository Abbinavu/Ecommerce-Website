import React from 'react'
import { toast,ToastContainer } from 'react-toastify'
import './Uploads.css'

const Uploads = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const desc = form.desc.value;
        const img = form.img.value;
        const price = form.price.value;

        if(title==="" || desc==="" || price==="" || img===""){
            toast.warn("fill all the required fields")
        }

        const store = {title,desc,price,img};
        console.log(store);

        fetch('http://localhost:5000/upload',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(store)
        }).then((res)=>res.json())
        .then((data)=>{
            toast.success("data added successfully");
            form.reset();
            window.location.href='/update';
        })
    }
    
  return (
    <div>
        <ToastContainer/>
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Uploads</h2>
                    <div>
                        <label value="title">Title</label>
                        <input type='text' name='title' id='title'/>
                    </div>
                    <div>
                        <label value="desc">Desc</label>
                        <input type='text' name='desc' id='desc'/>
                    </div>
                    <div>
                        <label value="price">Price</label>
                        <input type='numbers' name='price' id='price'/>
                    </div>
                    <div>
                        <label value="img">Image</label>
                        <input type='text' name='img' id='img'/>
                    </div>
                    <div>
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Uploads
import './main.css';
import {  useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const File = ()=>{
    useEffect(()=>{
    getfile();
    }, [])
    const [main, setmain] = useState([])
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");

// create
const create = async()=>{
    if(name.trim()===""){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your Name',
          })
    }else if (description.trim()===""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your Description',
          }) 
    }
    setname("");
    setdescription("");
    const response = await axios.post("/create", {
        name, description
    })
    if(response.data.success){
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: ' Once your file is been saved, it cannot be updated ',
            showConfirmButton: false,
            timer: 3000
          })
          getfile();
    }else(
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    )
}

//read
const getfile = async()=>{
    const response = await axios.get("/read");
    if (response.data.success){
        setmain(response.data.read);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        // alert("somthing went wrong")
    }
}

//delete
const handledelete = async (mainid)=>{
    let response = await axios.delete(`/delete/${mainid}`);
    if (response.data.success){
      getfile();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

return( 
    <>
<div className='main'>
<h1>File-Inn</h1>
<div className='description'>
<p >File-Inn is a website that allows you to easily generate links for your files.
 You can upload your files to File-Inn, and it will provide you with direct, shareable links. 
 This is a convenient way to share documents, images, or any type of file with others, without the need for email attachments or complex file sharing services. 
 Simply upload your file, copy the generated link, and share it with anyone you want to give access to the file. 
 File-Inn simplifies file sharing and collaboration. </p></div>

 <form className='form'>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="email" 
    className="form-control" 
    aria-describedby="emailHelp"
    placeholder='Enter your name'
    onChange={(e)=>setname(e.target.value)}
    value={name}
    />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Description</label>
    <input type="description" 
    className="form-control"
    placeholder='Enter description'
    onChange={(e)=>setdescription(e.target.value)}
    value={description}
    />
  </div>
  <button type="submit" 
  class="btn btn-primary"
  onClick={()=> create()}
  >Upload</button>
  <br></br>
  <input type='file' className='upload'
    onChange={(e)=>setmain(e.target.value)}
  />
</form>
</div>
{/* mapping */}
{main.map((v, i )=>{
    return(
        <div>
            <ul key={i}>
            <li>Name: {v.name}</li>
            <li>Description: {v.description}</li>
            </ul>
<button
onClick={() => {
handledelete(v._id);
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Your complaint is deleted permanently.',
})
}}
className="btn btn-primary">
Delete
</button>
</div>
)
})}
</>
)
}
export default File;
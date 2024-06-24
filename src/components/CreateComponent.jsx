import React, {useState} from 'react';
import postService from '../services/postService';

function CreateComponent(){

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('date', date);
        formData.append('image', image);

        const response = await postService.create(formData);
        if(response.data.success == true){
            setMessage("Post created successfully");
        }else{
            setMessage("Post Failed");
        }

        setTimeout(function(){
            setMessage('');
        }, 2000);

        event.target.reset();
    };
    return(
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                name="title" 
                placeholder="Enter Post Title" 
                onChange={event => setTitle(event.target.value)}
                className='fancy' 
                required/>

                <br /><br />

                <input type="date" 
                name="date" 
                onChange={event => setDate(event.target.value)} 
                required/>
                <br /><br />

                <input type="file" 
                name="image" 
                onChange={event => setImage(event.target.files[0])} 
                required/>
                <br /><br />

                <button>Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreateComponent;
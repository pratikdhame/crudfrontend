import postService from "../services/postService";
import { useState, useEffect } from "react";
import UpdateModelComponent from "./UpdateModelComponent";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function ShowComponent(){

    const [posts, setPosts] = useState({});

    const fetchPosts = async()=>{
        setPosts(await postService.getPosts());
    }

    useEffect(()=>{
        fetchPosts();
    },[posts])
    
    const deletePost = async(id, e) =>{
        var response = await postService.deletePost(id);
        if(response.data.success == true){
            alert(response.data.msg);
            document.getElementById(id).parentElement.parentElement.remove();
        }else{
            alert(response.data.msg);
        }
    }

    return(
        <div className="App">
            <h1>Posts</h1>
            {posts.data != undefined && posts.data.data.length > 0 && (
                <table style={{width: '100%'}} border='1'>
                    <thead>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </thead>
                    <tbody>
                        {posts.data.data.map(
                            post=> (
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{post.date}</td>
                                    <td><img src={'http://127.0.0.1:8000/api/postImages/'+post.image} style={{width: '100px', height: '100px'}} /></td>
                                    <td><button id={post._id} onClick={(e)=>deletePost(post._id, e)}>Delete</button></td>
                                    <td><UpdateModelComponent id={post._id} title={post.title} date={post.date}/></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ShowComponent;
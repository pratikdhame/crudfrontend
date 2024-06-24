import axios from 'axios';

class Post{
    create(formData){
        const url = "http://localhost:8000/api/create-post";
        const config = {
            headers:{
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, formData, config);
    }
}

export default new Post();
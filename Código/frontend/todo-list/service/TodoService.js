import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
  });

const TodoService = {
    async getAll(){
        try {
            const response = await axiosInstance.get('/todos');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default TodoService;
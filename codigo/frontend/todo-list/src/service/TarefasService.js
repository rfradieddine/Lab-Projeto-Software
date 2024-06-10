import axios from 'axios';

const API_URL = 'http://localhost:8080/todos'; // URL base da sua API

// Função para criar um novo Todo
const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o Todo:', error);
    throw error;
  }
};

// Função para listar todos os Todos
const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar os Todos:', error);
    throw error;
  }
};

// Função para atualizar um Todo
const updateTodo = async (todo) => {
  try {
    const response = await axios.put(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o Todo:', error);
    throw error;
  }
};

// Função para deletar um Todo pelo ID
const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar o Todo:', error);
    throw error;
  }
};

// Exporta todas as funções para serem usadas em outros lugares do aplicativo
export {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../service/TarefasService';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonCreate from '../ButtonCreate/ButtonCreate';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'; // Ícone para tarefa não realizada

export default function DataTable() {
  const [lista, setLista] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Tarefas', width: 200 },
    { field: 'descricao', headerName: 'Descrição', width: 200 },
    { field: 'dataPrevista', headerName: 'Data', width: 200 },
    {
      field: 'actions',
      headerName: 'Ações',
      description: 'Ações para o Todo',
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: 16 }}
            color='error'
          >
            <DeleteIcon />
          </Button>
          <Button
            onClick={() => handleUpdate(params.row)}
          >
            {params.row.completed ? "Marcar como não feito" : "Marcar como feito"}
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await getTodos();
      const updatedData = response.map(todo => ({
        ...todo,
        completed: todo.completed ? <CheckIcon /> : <ClearIcon />
      }));
      setLista(updatedData);
    } catch (error) {
      console.error('Erro ao buscar os todos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Erro ao deletar o todo:', error);
    }
  };

  const handleUpdate = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(updatedTodo);
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.error('Erro ao atualizar o todo:', error);
    }
  };

  return (
    <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: 400, width: '%' }}>
        <ButtonCreate />
        <DataGrid
          rows={lista}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

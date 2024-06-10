import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../service/TarefasService';

export default function DataTable() {
  const [lista, setLista] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Tarefas', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 200 },
    {
      field: 'completed',
      headerName: 'Status',
      type: 'boolean',
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      description: 'Ações para o Todo',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <strong>
          <button
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: 16 }}
          >
            Deletar
          </button>
          <button
            onClick={() => handleUpdate(params.row)}
          >
            Atualizar
          </button>
        </strong>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await getTodos();
      setLista(response);
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
      <div style={{ height: 400, width: '80%' }}>
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

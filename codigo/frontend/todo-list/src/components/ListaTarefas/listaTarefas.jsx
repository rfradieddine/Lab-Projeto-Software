import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../service/TarefasService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DataTable() {
  const [lista, setLista] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Tarefas', width: 200 },
    { field: 'descricao', headerName: 'Descrição', width: 200 },
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
      width: 180,
      renderCell: (params) => (
        
          <button
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: 16 }}
          >
            <DeleteForeverIcon />
          </button>
        
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
      <div style={{ height: 400, width: '52%' }}>
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

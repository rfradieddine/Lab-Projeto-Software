import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TodoService from '../../../service/TodoService';
import { useEffect } from 'react';

export default function DataTable() {
  const [lista, setLista] = React.useState([]);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Lista de tarefas', width: 130 },
    { field: 'lastName', headerName: 'Datas', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Ações',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (lista, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { nome: lista.nome, descricao: lista.descricao, realizado: lista.realizado}
  ]
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await TodoService.getAll();
        setLista(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);


  return (
    <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
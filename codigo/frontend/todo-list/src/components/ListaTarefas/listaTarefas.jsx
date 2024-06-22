import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../../service/TarefasService";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonCreate from "../ButtonCreate/ButtonCreate";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear"; // Ícone para tarefa não realizada
import AddTaskIcon from '@mui/icons-material/AddTask';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export default function DataTable() {
  const [lista, setLista] = useState([]);

  const columns = [
    { field: "nome", headerName: "Tarefas", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 200 },
    { field: "dataPrevista", headerName: "Data", width: 200 },
    { field: "prioridade", headerName: "Prioridade", width: 200 },
    {
      field: "realizado",
      headerName: "Realizado",
      width: 200,
      renderCell: (params) =>
        params.value ? <CheckIcon /> : <ClearIcon />,
    },
    {
      field: "actions",
      headerName: "Ações",
      description: "Ações para o Todo",
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: 16 }}
            color="error"
          >
            <DeleteIcon />
          </Button>
          <Button onClick={() => handleUpdate(params.row)}>
            {params.row.realizado ? < DoNotDisturbIcon /> : <AddTaskIcon />}
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await getTodos();
      setLista(response);
    } catch (error) {
      console.error("Erro ao buscar os todos:", error);
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
      console.error("Erro ao deletar o todo:", error);
    }
  };

  const handleUpdate = async (todo) => {
    try {
      const updatedTodo = { ...todo, realizado: !todo.realizado };
      await updateTodo(updatedTodo);
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.error("Erro ao atualizar o todo:", error);
    }
  };

  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: 400, width: "70%" }}>
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

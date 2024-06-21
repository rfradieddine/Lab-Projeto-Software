import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTodo } from "../../service/TarefasService"; // Certifique-se de que o caminho esteja correto

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  pt: 2,
  px: 4,
  pb: 3,
};

const prioridades = [
    { title: "Alta", value: "ALTA" },
    { title: "Média", value: "MEDIA" },
    { title: "Baixa", value: "BAIXA" },
];

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [prioridade, setPrioridade] = React.useState(null);
  const [dataPrevista, setData] = React.useState("");
  const [realizado, setRealizado] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!prioridade) {
      console.error("Prioridade não selecionada");
      return;
    }


    const todo = {
      nome,
      descricao,
      realizado,
      prioridade: prioridade.value,
      dataPrevista,
    };

    try {
      await createTodo(todo);
      // Limpar os campos e fechar o modal após a criação bem-sucedida
      setNome("");
      setDescricao("");
      setPrioridade(null);
      setRealizado(false);
      setData("");
      handleClose();
      location.reload();
    } catch (error) {
      console.error("Erro ao criar o Todo:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Criar Tarefa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 id="parent-modal-title">Insira sua tarefa</h2>
          <TextField
            id="nome"
            label="Nome"
            variant="standard"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            id="descricao"
            label="Descrição"
            variant="standard"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Autocomplete
            disablePortal
            id="prioridade"
            options={prioridades}
            getOptionLabel={(option) => option.title}
            value={prioridade}
            sx={{ mb: 2 }}
            onChange={(event, newValue) => {
              setPrioridade(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Prioridade" />}
          />
          <TextField
            id="date"
            label="Data prevista"
            sx={{ mb: 2 }}
            value={dataPrevista}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <br />
          <br />
          <br />
          <Button onClick={handleSave}>Salvar</Button>
        </Box>
      </Modal>
    </div>
  );
}

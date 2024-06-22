'use client'

import ListaTarefas from "../../components/ListaTarefas/listaTarefas";
import { Typography } from "@mui/material";
import '@fontsource/roboto/700.css';
import ButtonCreate from "../../components/ButtonCreate/ButtonCreate";

export default function Home() {
  return (
<>
    <div style={{height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
      <Typography variant="h4">Todo List</Typography>
    </div>
    <ListaTarefas />    
</>
  );
}

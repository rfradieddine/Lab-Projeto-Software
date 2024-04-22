'use client'

import Image from "next/image";
import styles from "./page.module.css";
import ListaTarefas from "../components/ListaTarefas/listaTarefas";
import { Typography } from "@mui/material";
import '@fontsource/roboto/700.css';


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

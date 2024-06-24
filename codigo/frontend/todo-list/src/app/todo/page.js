"use client";

import ListaTarefas from "../../components/ListaTarefas/listaTarefas";
import { Typography } from "@mui/material";
import "@fontsource/roboto/700.css";
import CustomButton from "../../components/CustomButton/CustomButton";

export default function Home() {
  return (
    <>
      <div
        style={{
          height: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            color: "#1976D8 ", 
            marginBottom: "20px", 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: "bold", 
          }}
        >
          Minha Lista de Tarefas
        </Typography>
      </div>
      <ListaTarefas />
    </>
  );
}

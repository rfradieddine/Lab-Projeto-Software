package com.labdessoft.roteiro01.mock;

import com.labdessoft.roteiro01.entity.Todo;

import java.util.Date;

public class TaskMock {

    public static Todo createTask(Long id, String nome, String descricao, boolean realizado, Date dataPrevista, Todo.Priority prioridade) {
        Todo todo = new Todo();
        todo.setId(id);
        todo.setNome(nome);
        todo.setDescricao(descricao);
        todo.setRealizado(realizado);
        todo.setDataPrevista(dataPrevista);
        todo.setPrioridade(prioridade);
        return todo;
    }

    public static Todo createDefaultTask1() {
        return createTask(1L, "Todo 1", "Descrição do Todo 1", false, new Date(), Todo.Priority.MEDIA);
    }

    public static Todo createDefaultTask2() {
        return createTask(2L, "Todo 2", "Descrição do Todo 2", true, new Date(), Todo.Priority.ALTA);
    }

}
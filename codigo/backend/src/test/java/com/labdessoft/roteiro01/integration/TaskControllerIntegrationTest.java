package com.labdessoft.roteiro01.integration;

import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.repository.TodoRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TodoRepository todoRepository;

    @BeforeEach
    void setUp() {
        todoRepository.deleteAll();
    }

    @Test
    void testCreateTodo() throws Exception {
        Todo todo = new Todo();
        todo.setNome("Teste");
        todo.setDescricao("Descrição do teste");
        todo.setRealizado(false);
        todo.setDataPrevista(new Date());
        todo.setPrioridade("Alta");

        mockMvc.perform(post("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Teste\",\"descricao\":\"Descrição do teste\",\"realizado\":false,\"dataPrevista\":\"01/01/2024\",\"prioridade\":\"Alta\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Teste"));
    }

    @Test
    void testListTodos() throws Exception {
        Todo todo = new Todo();
        todo.setNome("Teste");
        todo.setDescricao("Descrição do teste");
        todo.setRealizado(false);
        todo.setDataPrevista(new Date());
        todo.setPrioridade("Alta");
        todoRepository.save(todo);

        mockMvc.perform(get("/todos")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Teste"));
    }

    @Test
    void testUpdateTodo() throws Exception {
        Todo todo = new Todo();
        todo.setNome("Teste");
        todo.setDescricao("Descrição do teste");
        todo.setRealizado(false);
        todo.setDataPrevista(new Date());
        todo.setPrioridade("Alta");
        todo = todoRepository.save(todo);

        String updatedTodoJson = String.format(
                "{\"id\":%d,\"nome\":\"Teste Atualizado\",\"descricao\":\"Descrição atualizada\",\"realizado\":true,\"dataPrevista\":\"01/01/2024\",\"prioridade\":\"Baixa\"}",
                todo.getId()
        );

        mockMvc.perform(put("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedTodoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Teste Atualizado"));
    }

    @Test
    void testDeleteTodo() throws Exception {
        Todo todo = new Todo();
        todo.setNome("Teste");
        todo.setDescricao("Descrição do teste");
        todo.setRealizado(false);
        todo.setDataPrevista(new Date());
        todo.setPrioridade("Alta");
        todo = todoRepository.save(todo);

        mockMvc.perform(delete("/todos/{id}", todo.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }
}

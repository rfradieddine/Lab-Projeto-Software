package com.labdessoft.roteiro01.unit.controller;

import com.labdessoft.roteiro01.controller.TodoController;
import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

class TodoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TodoService todoService;

    @InjectMocks
    private TodoController todoController;

    private Todo todo1;
    private Todo todo2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(todoController).build();

        todo1 = new Todo();
        todo1.setId(1L);
        todo1.setNome("Todo 1");

        todo2 = new Todo();
        todo2.setId(2L);
        todo2.setNome("Todo 2");
    }

    @Test
    void create() throws Exception {
        when(todoService.create(any(Todo.class))).thenReturn((Todo) Arrays.asList(todo1, todo2));

        mockMvc.perform(post("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Todo 1\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Todo 1"))
                .andExpect(jsonPath("$[1].nome").value("Todo 2"));
    }

    @Test
    void list() throws Exception {
        when(todoService.list()).thenReturn(Arrays.asList(todo1, todo2));

        mockMvc.perform(get("/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Todo 1"))
                .andExpect(jsonPath("$[1].nome").value("Todo 2"));
    }

    @Test
    void update() throws Exception {
        when(todoService.update(any(Todo.class))).thenReturn((Todo) Arrays.asList(todo1, todo2));

        mockMvc.perform(put("/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1,\"nome\":\"Todo 1\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Todo 1"))
                .andExpect(jsonPath("$[1].nome").value("Todo 2"));
    }
}

package com.labdessoft.roteiro01.unit.service;

import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.repository.TodoRepository;
import com.labdessoft.roteiro01.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    private Todo todo1;
    private Todo todo2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        todo1 = new Todo();
        todo1.setId(1L);
        todo1.setNome("Todo 1");

        todo2 = new Todo();
        todo2.setId(2L);
        todo2.setNome("Todo 2");
    }

    @Test
    void create() {
        when(todoRepository.save(todo1)).thenReturn(todo1);
        when(todoRepository.findAll(Sort.by("nome").ascending())).thenReturn(Arrays.asList(todo1, todo2));

        List<Todo> todos = (List<Todo>) todoService.create(todo1);

        assertEquals(2, todos.size());
        verify(todoRepository, times(1)).save(todo1);
        verify(todoRepository, times(1)).findAll(Sort.by("nome").ascending());
    }

    @Test
    void list() {
        when(todoRepository.findAll(Sort.by("nome").ascending())).thenReturn(Arrays.asList(todo1, todo2));

        List<Todo> todos = todoService.list();

        assertEquals(2, todos.size());
        verify(todoRepository, times(1)).findAll(Sort.by("nome").ascending());
    }

    @Test
    void update() {
        when(todoRepository.save(todo1)).thenReturn(todo1);
        when(todoRepository.findAll(Sort.by("nome").ascending())).thenReturn(Arrays.asList(todo1, todo2));

        List<Todo> todos = (List<Todo>) todoService.update(todo1);

        assertEquals(2, todos.size());
        verify(todoRepository, times(1)).save(todo1);
        verify(todoRepository, times(1)).findAll(Sort.by("nome").ascending());
    }

    @Test
    void delete() {
        doNothing().when(todoRepository).deleteById(1L);
        when(todoRepository.findAll(Sort.by("nome").ascending())).thenReturn(Arrays.asList(todo2));

        List<Todo> todos = todoService.delete(1L);

        assertEquals(1, todos.size());
        verify(todoRepository, times(1)).deleteById(1L);
        verify(todoRepository, times(1)).findAll(Sort.by("nome").ascending());
    }
}

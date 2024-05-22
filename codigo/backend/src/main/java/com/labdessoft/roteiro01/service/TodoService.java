package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.repository.TodoRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Date;

@Service
@Validated
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> create(Todo todo) {
        validateTodoType(todo);
        todoRepository.save(todo);
        return list();
    }

    public List<Todo> list() {
        Sort sort = Sort.by("nome").ascending();
        return todoRepository.findAll(sort);
    }

    public List<Todo> update(Todo todo) {
        validateTodoType(todo);
        todoRepository.save(todo);
        return list();
    }

    public List<Todo> delete(Long id) {
        todoRepository.deleteById(id);
        return list();
    }

    private void validateTodoType(Todo todo) {
        if (todo.getTipo() == Todo.TaskType.DATA) {
            if (todo.getDataPrevista() == null || todo.getDataPrevista().before(new Date())) {
                throw new IllegalArgumentException("A data prevista deve ser igual ou superior à data atual.");
            }
        } else if (todo.getTipo() == Todo.TaskType.PRAZO) {
            if (todo.getPrazo() == null || todo.getPrazo() <= 0) {
                throw new IllegalArgumentException("O prazo deve ser maior que zero.");
            }
        }
    }
}

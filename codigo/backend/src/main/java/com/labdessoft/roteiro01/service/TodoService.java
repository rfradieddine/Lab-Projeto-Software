package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Creates a new Todo item.
     *
     * @param todo the Todo item to create
     * @return the created Todo item
     */
    public Todo create(Todo todo) {
        return todoRepository.save(todo);
    }

    /**
     * Lists all Todo items sorted by name.
     *
     * @return a list of all Todo items
     */
    public List<Todo> list() {
        Sort sort = Sort.by("nome").ascending();
        return todoRepository.findAll(sort);
    }

    /**
     * Updates an existing Todo item.
     *
     * @param todo the Todo item to update
     * @return the updated Todo item
     * @throws ResourceNotFoundException if the Todo item does not exist
     */
    public Todo update(Todo todo) {
        Optional<Todo> existingTodo = todoRepository.findById(todo.getId());
        if (existingTodo.isEmpty()) {
            throw new ResourceNotFoundException("Todo item not found with id: " + todo.getId());
        }
        return todoRepository.save(todo);
    }

    /**
     * Deletes a Todo item by id.
     *
     * @param id the id of the Todo item to delete
     * @return
     * @throws ResourceNotFoundException if the Todo item does not exist
     */
    public List<Todo> delete(Long id) {
        try {
            todoRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Todo item not found with id: " + id);
        }
        return null;
    }

    /**
     * Checks the health of the service.
     *
     * @return true if the service is healthy, false otherwise
     */
    public boolean isHealthy() {
        try {
            todoRepository.count();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Custom exception classes
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}

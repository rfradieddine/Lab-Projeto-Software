package com.labdessoft.roteiro01.controller;

import com.labdessoft.roteiro01.entity.Todo;
import com.labdessoft.roteiro01.service.TodoService;
import com.labdessoft.roteiro01.service.TodoService.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "https://lab-projeto-software-5ykwn6cqn.vercel.app/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * Creates a new Todo item.
     *
     * @param todo the Todo item to create
     * @return the created Todo item
     */
    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        Todo createdTodo = todoService.create(todo);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    /**
     * Lists all Todo items.
     *
     * @return a list of all Todo items
     */
    @GetMapping
    public ResponseEntity<List<Todo>> list() {
        List<Todo> todos = todoService.list();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    /**
     * Updates an existing Todo item.
     *
     * @param todo the Todo item to update
     * @return the updated Todo item
     */
    @PutMapping
    public ResponseEntity<Todo> update(@RequestBody Todo todo) {
        try {
            Todo updatedTodo = todoService.update(todo);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Deletes a Todo item by id.
     *
     * @param id the id of the Todo item to delete
     * @return a ResponseEntity with the status of the deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        try {
            todoService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Checks the health of the service.
     *
     * @return a ResponseEntity with the health status of the service
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        boolean isHealthy = todoService.isHealthy();
        if (isHealthy) {
            return ResponseEntity.ok("Aplicação está operacional");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Aplicação com problemas");
        }
    }
}

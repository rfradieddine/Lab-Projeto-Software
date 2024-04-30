package com.labdessoft.roteiro01.repository;

import com.labdessoft.roteiro01.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}

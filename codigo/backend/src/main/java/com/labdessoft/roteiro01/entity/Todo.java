package com.labdessoft.roteiro01.entity;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;

@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private boolean realizado;

    @Enumerated(EnumType.STRING)
    private TaskType tipo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @FutureOrPresent(message = "A data prevista deve ser igual ou superior à data atual.")
    private Date dataPrevista;
    private Integer prazo;

    @Enumerated(EnumType.STRING)
    private Priority prioridade;

    public enum TaskType {
        DATA, PRAZO, LIVRE
    }

    public enum Priority {
        ALTA, MEDIA, BAIXA
    }

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isRealizado() {
        return realizado;
    }

    public void setRealizado(boolean realizado) {
        this.realizado = realizado;
    }

    public TaskType getTipo() {
        return tipo;
    }

    public void setTipo(TaskType tipo) {
        this.tipo = tipo;
    }

    public Date getDataPrevista() {
        return dataPrevista;
    }

    public void setDataPrevista(Date dataPrevista) {
        this.dataPrevista = dataPrevista;
    }

    public Integer getPrazo() {
        return prazo;
    }

    public void setPrazo(Integer prazo) {
        this.prazo = prazo;
    }

    public Priority getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Priority prioridade) {
        this.prioridade = prioridade;
    }
}

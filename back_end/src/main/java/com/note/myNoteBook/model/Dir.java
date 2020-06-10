package com.note.myNoteBook.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


import java.util.UUID;

public class Dir {

  private UUID id;
  private UUID parent_id;
  @NotBlank (message = "name cannot be blank")
  private String name;

  public Dir(
          @JsonProperty("id") UUID id,
          @JsonProperty("parent_id") UUID parent_id,
          @JsonProperty("name") String name) {
    this.id = id;
    this.parent_id = parent_id;
    this.name = name;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public UUID getParent_id() {
    return parent_id;
  }

  public void setParent_id(UUID parent_id) {
    this.parent_id = parent_id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Dir{" +
            "id=" + id +
            ", parent_id=" + parent_id +
            ", name='" + name + '\'' +
            '}';
  }
}

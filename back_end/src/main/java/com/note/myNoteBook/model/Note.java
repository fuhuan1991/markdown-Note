package com.note.myNoteBook.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * This class defines a note but with no real content. Is has a content_id field to link up with a content object
 */
public class Note {

  private UUID id;
  private UUID parent_id;
  @NotNull (message = "content_id is required")
  private UUID content_id;
  @NotBlank (message = "name cannot be blank")
  private String name;

  public Note(
          @JsonProperty("id") UUID id,
          @JsonProperty("parent_id") UUID parent_id,
          @JsonProperty("content_id") UUID content_id,
          @JsonProperty("name") String name) {
    this.id = id;
    this.parent_id = parent_id;
    this.content_id = content_id;
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

  public UUID getContent_id() {
    return content_id;
  }

  public void setContent_id(UUID content_id) {
    this.content_id = content_id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Note{" +
            "id=" + id +
            ", parent_id=" + parent_id +
            ", content_id=" + content_id +
            ", name='" + name + '\'' +
            '}';
  }
}

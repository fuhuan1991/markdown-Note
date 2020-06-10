package com.note.myNoteBook.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;


public class NoteCreationRequest {
  @NotBlank
  private String title;
  private String text;
  private UUID parent_id;

  public NoteCreationRequest(
          @JsonProperty("title") String title,
          @JsonProperty("text") String text,
          @JsonProperty("parent_id") UUID parent_id) {
    this.title = title;
    this.text = text;
    this.parent_id = parent_id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public UUID getParent_id() {
    return parent_id;
  }

  public void setParent_id(UUID parent_id) {
    this.parent_id = parent_id;
  }

  @Override
  public String toString() {
    return "NoteRequest{" +
            "title='" + title + '\'' +
            ", text='" + text + '\'' +
            ", parent_id=" + parent_id +
            '}';
  }
}

package com.note.myNoteBook.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.UUID;

/**
 * This class defines the practical content of a note file.
 */
public class Content {

  private UUID id;
  private String text;

  public Content(
          @JsonProperty("id") UUID id,
          @JsonProperty("text") String text) {
    this.id = id;
    this.text = text;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  @Override
  public String toString() {
    return "Content{" +
            "id=" + id +
            ", text='" + text + '\'' +
            '}';
  }
}

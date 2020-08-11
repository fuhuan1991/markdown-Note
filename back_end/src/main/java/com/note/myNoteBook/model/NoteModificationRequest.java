package com.note.myNoteBook.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

public class NoteModificationRequest {

  @NotNull
  private UUID id;
  private UUID parent_id;
  private String title;
  private String text;

  public NoteModificationRequest(@NotNull UUID id, UUID parent_id, String title, String text) {
    this.id = id;
    this.parent_id = parent_id;
    this.title = title;
    this.text = text;
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

  @Override
  public String toString() {
    return "NoteModificationRequest{" +
            "id=" + id +
            ", parent_id=" + parent_id +
            ", title='" + title + '\'' +
            ", text='" + text + '\'' +
            '}';
  }
}

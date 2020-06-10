package com.note.myNoteBook.model;

import com.note.myNoteBook.MenuUnitType;

import java.util.UUID;

public class MenuUnit {
  private UUID id;
  private UUID parent_id;
  private MenuUnitType type;
  private String name;

  public MenuUnit(UUID id, UUID parent_id, MenuUnitType type, String name) {
    this.id = id;
    this.parent_id = parent_id;
    this.type = type;
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

  public MenuUnitType getType() {
    return type;
  }

  public void setType(MenuUnitType type) {
    this.type = type;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "MenuUnit{" +
            "id=" + id +
            ", parent_id=" + parent_id +
            ", type=" + type +
            ", name='" + name + '\'' +
            '}';
  }
}

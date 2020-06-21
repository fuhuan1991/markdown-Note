package com.note.myNoteBook.repository;


import com.note.myNoteBook.model.Dir;
import com.note.myNoteBook.model.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class NoteRepository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public NoteRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public int insertNote (Note note) {
    String sql = "" +
            "INSERT INTO note (" +
            " id, " +
            " parent_id, " +
            " content_id, " +
            " name)" +
            "VALUES (?, ?, ?, ?)";

    int update = jdbcTemplate.update(
            sql,
            note.getId(),
            note.getParent_id(),
            note.getContent_id(),
            note.getName()
    );
    return update;
  }

  public Note findNoteById(UUID id) {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " content_id, " +
            " name " +
            "FROM note " +
            "WHERE id = ?";

    List<Note> list =  jdbcTemplate.query(sql, new Object[]{id}, mapNoteFromDb());
    if (list.isEmpty()) return null;
    return list.get(0);
  }

  public List<Note> findNoteByParent_id(UUID parent_id) {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " content_id, " +
            " name " +
            "FROM note " +
            "WHERE parent_id = ?";

    List<Note> list =  jdbcTemplate.query(sql, new Object[]{parent_id}, mapNoteFromDb());
    if (list.isEmpty()) return null;
    return list;
  }

  public List<Note> findAllNote() {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " content_id, " +
            " name " +
            "FROM note";
    List<Note> list =  jdbcTemplate.query(sql, new Object[]{}, mapNoteFromDb());
    if (list.isEmpty()) return null;
    return list;
  }

  public int updateNote(Note note) {
    String sql = "UPDATE note " +
            "SET id = ?, " +
            " parent_id = ?, " +
            " content_id = ?, " +
            " name = ? " +
            "WHERE id = ?";
    int update = jdbcTemplate.update(
            sql,
            note.getId(),
            note.getParent_id(),
            note.getContent_id(),
            note.getName(),
            note.getId()
    );
    return update;
  }

  public int deleteNote(UUID id) {
    String sql = "" +
            "DELETE FROM note " +
            "WHERE id = ?";
    int r = jdbcTemplate.update(
            sql,
            id
    );
    return r;
  }


  private RowMapper<Note> mapNoteFromDb() {

    return (resultSet, i) -> {
      String idStr = resultSet.getString("id");
      UUID id = UUID.fromString(idStr);

      String parent_idStr = resultSet.getString("parent_id");
      UUID parent_id = UUID.fromString(parent_idStr);

      String content_idStr = resultSet.getString("content_id");
      UUID content_id = UUID.fromString(content_idStr);

      String name = resultSet.getString("name");

      return new Note(id, parent_id, content_id, name);
    };
  }
}

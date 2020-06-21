package com.note.myNoteBook.repository;

import com.note.myNoteBook.model.Content;
import com.note.myNoteBook.model.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ContentRepository {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public ContentRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public int insertContent (Content content) {
    String sql = "" +
            "INSERT INTO content (" +
            " id, " +
            " text)" +
            "VALUES (?, ?)";
    int update = jdbcTemplate.update(
            sql,
            content.getId(),
            content.getText()
    );
    return update;
  }

  public Content findContentById (UUID id) {
    String sql = "" +
            "SELECT " +
            " id, " +
            " text " +
            "FROM content " +
            "WHERE id = ?";
    List<Content> list =  jdbcTemplate.query(sql, new Object[]{id}, mapContentFromDb());
    if (list.isEmpty()) return null;
    return list.get(0);
  }

  public int upgradeContent (Content content) {
    String sql = "UPDATE content " +
            "SET id = ?, " +
            " text = ? " +
            "WHERE id = ?";
    int update = jdbcTemplate.update(
            sql,
            content.getId(),
            content.getText(),
            content.getId()
    );
    return update;
  }

  public int deleteContent(UUID id) {
    String sql = "" +
            "DELETE FROM content " +
            "WHERE id = ?";
    int r = jdbcTemplate.update(
            sql,
            id
    );
    return r;
  }


  private RowMapper<Content> mapContentFromDb() {

    return (resultSet, i) -> {
      String idStr = resultSet.getString("id");
      UUID id = UUID.fromString(idStr);

      String text = resultSet.getString("text");

      return new Content(id, text);
    };
  }
}

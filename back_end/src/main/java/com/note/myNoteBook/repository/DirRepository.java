package com.note.myNoteBook.repository;

import com.note.myNoteBook.model.Dir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class DirRepository {

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public DirRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public int insertDir (Dir dir) {
    String sql = "" +
            "INSERT INTO dir (" +
            " id, " +
            " parent_id, " +
            " name)" +
            "VALUES (?, ?, ?)";

    int update = jdbcTemplate.update(
            sql,
            dir.getId(),
            dir.getParent_id(),
            dir.getName()
    );
    return update;
  }

  public Dir findDirById(UUID id) {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " name " +
            "FROM dir " +
            "WHERE id = ?";

    List<Dir> list =  jdbcTemplate.query(sql, new Object[]{id}, mapDirFromDb());
    if (list.isEmpty()) return null;
    return list.get(0);
  }

  public List<Dir> findDirByParentId(UUID parent_id) {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " name " +
            "FROM dir " +
            "WHERE parent_id = ?";

    List<Dir> list =  jdbcTemplate.query(sql, new Object[]{parent_id}, mapDirFromDb());
    if (list.isEmpty()) return null;
    return list;
  }

  public List<Dir> findAllDir() {
    String sql = "" +
            "SELECT " +
            " id, " +
            " parent_id, " +
            " name " +
            "FROM dir";
    List<Dir> list =  jdbcTemplate.query(sql, new Object[]{}, mapDirFromDb());
    if (list.isEmpty()) return null;
    return list;
  }

  public int updateDir(Dir dir) {
    String sql = "UPDATE dir " +
            "SET id = ?, " +
            " parent_id = ?, " +
            " name = ? " +
            "WHERE id = ?";
    int update = jdbcTemplate.update(
            sql,
            dir.getId(),
            dir.getParent_id(),
            dir.getName(),
            dir.getId()
    );
    return update;
  }

  public int deleteDir(UUID id) {
    String sql = "" +
            "DELETE FROM dir " +
            "WHERE id = ?";
    int r = jdbcTemplate.update(
            sql,
            id
    );
    return r;
  }

  private RowMapper<Dir> mapDirFromDb() {

    return (resultSet, i) -> {
      String idStr = resultSet.getString("id");
      UUID id = UUID.fromString(idStr);

      String parent_idStr = resultSet.getString("parent_id");
      UUID parent_id = UUID.fromString(parent_idStr);

      String name = resultSet.getString("name");

      return new Dir(id, parent_id, name);
    };
  }
}

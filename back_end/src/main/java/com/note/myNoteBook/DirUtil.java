package com.note.myNoteBook;

import com.note.myNoteBook.model.Dir;
import com.note.myNoteBook.repository.DirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DirUtil {
  public static final UUID ROOT_DIR_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");
  private final DirRepository dirRepository;

  @Autowired
  public DirUtil (DirRepository dirRepository) {
    this.dirRepository = dirRepository;
  }

  /**
   * Check weather a directory is valid or not.
   * Under one directory, duplicate name is not allowed
   */
  public boolean isDirValid (Dir dir) {
    UUID parent_id = dir.getParent_id() == null ? this.ROOT_DIR_ID : dir.getParent_id();
    List<Dir> list = this.dirRepository.findDirByParentId(parent_id);
    if (list == null) return true;
    for (Dir d : list) {
      if (d.getName().equals(dir.getName())) return false;
    }
    return true;
  }

  public UUID getValidId () {
    UUID id = UUID.randomUUID();
    while (id.equals(ROOT_DIR_ID)) {
      id = UUID.randomUUID();
    }
    return id;
  }
}

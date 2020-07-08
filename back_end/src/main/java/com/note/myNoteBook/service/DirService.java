package com.note.myNoteBook.service;

import com.note.myNoteBook.DirUtil;
import com.note.myNoteBook.model.Dir;
import com.note.myNoteBook.repository.DirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DirService {
  private final DirRepository dirRepository;
  private final DirUtil dirUtil;

  @Autowired
  public DirService(DirRepository dirRepository, DirUtil dirUtil) {
    this.dirRepository = dirRepository;
    this.dirUtil = dirUtil;
  }

  public void insertDir (Dir dir) throws Exception{
    if (dir.getId() == null) {
      UUID id = this.dirUtil.getValidId();
      dir.setId(id);
    }
    if (dir.getParent_id() == null) {
      dir.setParent_id(DirUtil.ROOT_DIR_ID);
    }
    if (!this.dirUtil.isDirValid(dir)) throw new Exception("name duplication");
    this.dirRepository.insertDir(dir);
  }

  public List<Dir> getAllDir () {
    List<Dir> list = this.dirRepository.findAllDir();
    return list;
  }

  public Dir getDirById (UUID id) {
    Dir dir = this.dirRepository.findDirById(id);
    return dir;
  }

  public void updateDir (Dir dir) {
    this.dirRepository.updateDir(dir);
  }

  public void deleteDir (UUID id) {
    this.dirRepository.deleteDir(id);
  }

  public void deleteDir (Dir dir) {
    this.deleteDir(dir.getId());
  }
}

package com.note.myNoteBook.service;

import com.note.myNoteBook.DirUtil;
import com.note.myNoteBook.model.Dir;
import com.note.myNoteBook.model.Note;
import com.note.myNoteBook.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService {

  private NoteRepository noteRepository;

  @Autowired
  public NoteService(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  public void insertNote(Note note) throws Exception {
    if (note.getId() == null) {
      UUID id = UUID.randomUUID();
      note.setId(id);
    }
    if (note.getParent_id() == null) {
      note.setParent_id(DirUtil.ROOT_DIR_ID);
    }
    if (!this.isNoteValid(note)) throw new Exception("name duplication");
    this.noteRepository.insertNote(note);
  }

  public List<Note> getAllNote() {
    return this.noteRepository.findAllNote();
  }

  public Note getNoteById(UUID id) {
    return this.noteRepository.findNoteById(id);
  }

  public void updateNote(Note note) {
    this.noteRepository.updateNote(note);
  }

  public void deleteNote(UUID id) {
    this.noteRepository.deleteNote(id);
  }

  public boolean isNoteValid (Note note) {
    List<Note> list = this.noteRepository.findNoteByParent_id(note.getParent_id());
    if (list == null) return true;
    for (Note n : list) {
      if (n.getName().equals(note.getName())) return false;
    }
    return true;
  }

}

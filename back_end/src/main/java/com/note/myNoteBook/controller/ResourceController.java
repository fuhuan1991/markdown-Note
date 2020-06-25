package com.note.myNoteBook.controller;

import com.note.myNoteBook.DirUtil;
import com.note.myNoteBook.Response;
import com.note.myNoteBook.MenuUnitType;
import com.note.myNoteBook.model.*;
import com.note.myNoteBook.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/")
@Validated
@RestController
public class ResourceController {
  private final DirService dirService;
  private final NoteService noteService;
  private final ContentService contentService;

  @Autowired
  public ResourceController (DirService dirService, NoteService noteService, ContentService contentService) {
    this.dirService = dirService;
    this.noteService = noteService;
    this.contentService = contentService;
  }

  /**
   * Create a new directory.
   */
  @CrossOrigin
  @PostMapping(path = "dir/create")
  public ResponseEntity<Response> createDir (@Valid @RequestBody Dir dir) {
    System.out.println("----------------create dir-------------------");
    System.out.println(dir);

    try {
      this.dirService.insertDir(dir);
      return new ResponseEntity<>(new Response("ok"), null, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(new Response(e.getMessage()), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @PostMapping(path = "note/create")
  public void createNote (@Valid @RequestBody NoteCreationRequest request) throws Exception {
    System.out.println("----------------create Note-------------------");
    System.out.println(request);

    Content c_temp = null;
    Note n_temp = null;

    try {
      String title = request.getTitle();
      String text = request.getText();
      UUID parent_id = request.getParent_id();

      Content c = new Content(null, text);
      c_temp = c;
      this.contentService.insertContent(c);

      Note n = new Note(null, parent_id, c.getId(), title);
      n_temp = n;
      this.noteService.insertNote(n);
    } catch (Exception e) {
      e.printStackTrace();
      if (c_temp != null) this.contentService.deleteContent(c_temp.getId());
      if (n_temp != null) this.noteService.deleteNote(n_temp.getId());
      throw e;
    }
  }

  /**
   * Read all directory records from DB, construct a JSON structure and then return it to user.
   */
  @CrossOrigin
  @GetMapping(path = "dir/getMenu")
  public List<MenuUnit> getDirStructure () throws Exception{
    System.out.println("----------------get Directory Structure-------------------");
    try {
      List<MenuUnit> result = new LinkedList<>();
      result.add(new MenuUnit(DirUtil.ROOT_DIR_ID, null, MenuUnitType.DIR, "Root"));

      List<Dir> dirList = this.dirService.getAllDir();
      if (dirList != null) {
        for (Dir d : dirList) {
          MenuUnit unit = new MenuUnit(d.getId(), d.getParent_id(), MenuUnitType.DIR, d.getName());
          result.add(unit);
        }
      }

      List<Note> noteList = this.noteService.getAllNote();
      if (noteList != null) {
        for (Note n : noteList) {
          MenuUnit unit = new MenuUnit(n.getId(), n.getParent_id(), MenuUnitType.FILE, n.getName());
          result.add(unit);
        }
      }

      return result;
    } catch (Exception e) {
      e.printStackTrace();
      throw e;
    }
  }

  /**
   * Update a directory.
   */
  @CrossOrigin
  @PutMapping(path = "dir/update")
  public void updateDir (@Valid @RequestBody Dir dir) throws Exception{
    System.out.println("----------------update dir-------------------");
    System.out.println(dir);

    try {
      this.dirService.updateDir(dir);
    } catch (Exception e) {
      e.printStackTrace();
      throw e;
    }
  }

  @CrossOrigin
  @PutMapping(path = "note/update")
  public void updateNote (@Valid @RequestBody NoteModificationRequest request) throws Exception{
    System.out.println("----------------update note-------------------");
    System.out.println(request);

    String title = request.getTitle();
    String text = request.getText();
    UUID id = request.getId();
    UUID parent_id = request.getParent_id();

    Note n = this.noteService.getNoteById(id);
    if (n == null) throw new RuntimeException("note does not exist");
    n.setParent_id(parent_id);
    n.setName(title);
    this.noteService.updateNote(n);

    Content c = new Content(n.getContent_id(), text);
    this.contentService.updateContent(c);
  }

  /**
   * Delete a directory.
   */
  @CrossOrigin
  @DeleteMapping(path = "dir/delete/{id}")
  public ResponseEntity<Response> deleteDir (@PathVariable("id") String id) throws Exception{
    System.out.println("----------------update dir-------------------");
    System.out.println(id);
    try {
      Dir d = this.dirService.getDirById(UUID.fromString(id));
      if (d == null) throw new RuntimeException("notebook does not exist");
      this.dirService.deleteDir(UUID.fromString(id));
      return new ResponseEntity<>(new Response("directory deleted"), null, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(new Response(e.getMessage()), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @CrossOrigin
  @DeleteMapping(path = "note/delete/{id}")
  public ResponseEntity<Response> deleteNote (@PathVariable("id") String id) throws Exception{
    System.out.println("----------------update note-------------------");
    System.out.println(id);
    try {
      Note n = this.noteService.getNoteById(UUID.fromString(id));
      if (n == null) throw new RuntimeException("note does not exist");
      this.noteService.deleteNote(UUID.fromString(id));
      this.contentService.deleteContent(n.getContent_id());
      return new ResponseEntity<>(new Response("note deleted"), null, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(new Response(e.getMessage()), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

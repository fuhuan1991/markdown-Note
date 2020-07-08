package com.note.myNoteBook.service;

import com.note.myNoteBook.DirUtil;
import com.note.myNoteBook.model.Content;
import com.note.myNoteBook.model.Dir;
import com.note.myNoteBook.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ContentService {
  private final ContentRepository contentRepository;

  public ContentService(ContentRepository contentRepository) {
    this.contentRepository = contentRepository;
  }

  public void insertContent (Content content) throws Exception{
    if (content.getId() == null) {
      UUID id = UUID.randomUUID();
      content.setId(id);
    }
    this.contentRepository.insertContent(content);
  }

  public Content getContentById (UUID id) {
    return this.contentRepository.findContentById(id);
  }

  public void updateContent (Content content) {
    this.contentRepository.upgradeContent(content);
  }

  public void deleteContent (UUID id) {
    this.contentRepository.deleteContent(id);
  }
}

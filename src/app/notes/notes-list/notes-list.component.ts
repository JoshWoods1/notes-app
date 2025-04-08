import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  standalone: false
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe((notes: Note[]) => {
      this.notes = notes;
      this.filterNotes();
    });
  }

  deleteNote(_id: string): void {
    this.noteService.deleteNote(_id).subscribe(() => {
      this.notes = this.notes.filter(note => note._id !== _id);
      this.filterNotes();
    });
  }

  filterNotes(): void {
    this.filteredNotes = this.notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            note.content.toLowerCase().includes(this.searchTerm.toLowerCase());

      // const matchesCategory = this.selectedCategory ? note.category === this.selectedCategory : true;

      return matchesSearch;
    });
  }

  


  // Method to handle deleting a note
  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.deleteNote(id); // Call the deleteNote method
    }
  }
}
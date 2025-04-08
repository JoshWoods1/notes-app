import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService, Note } from '../note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  standalone: false
})
export class NoteEditComponent implements OnInit {
  note: Note = { _id: '', title: '', content: '', category: '' };
  isLoading = true;
  isEditMode = false;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const _id = this.route.snapshot.paramMap.get('_id');
    if (_id) {
      this.noteService.getNoteById(_id).subscribe({
        next: (data) => {
          this.note = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading note', err);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.note._id) {
      this.noteService.updateNote(this.note._id, this.note).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note.model';
import { NoteService } from '../note.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  standalone: false
})
export class NoteFormComponent implements OnInit {

  @Input() note: Note = {
    _id: '',
    title: '',
    content: '',
    category: '',
    createdAt: ''
  };
  @Output() formSubmit = new EventEmitter<void>();

  noteForm: FormGroup;
  isEditMode: any;

  constructor(
    private fb: FormBuilder, 
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(id).subscribe((data) => {
        this.note = data;
      });
    }
    if (this.note) {
      this.noteForm.patchValue({
        title: this.note.title,
        content: this.note.content,
        category: this.note.category
      });
    }
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      console.log('Form is invalid!');
      return;
    }
  
    const formValue = this.noteForm.value;
    console.log('Form Value:', formValue); // Debug log
  
    this.noteService.createNote(formValue).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating note:', err); // Debug log
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
    }
}

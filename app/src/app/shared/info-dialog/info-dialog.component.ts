import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Department, User } from 'src/app/models/user.model';
import { DialogData, DialogType } from './dialog.models';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnChanges {
  @Input() data!: DialogData;
  @Output() hideDialogEE = new EventEmitter();
  @Output() changesSavedEE = new EventEmitter<User>();
  @Output() removedRowEE = new EventEmitter();
  DialogTypeSave = DialogType.Save;
  DialogTypeRemove = DialogType.Remove;
  departments = Object.values(Department);

  form = this.formBuilder.group({
    name: new FormControl(),
    email: new FormControl(),
    department: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    if (this.data && this.data.user) {
      this.form = new FormGroup({
        name: new FormControl(this.data.user?.name, Validators.required),
        email: new FormControl(this.data.user?.email, Validators.required),
        department: new FormControl(
          this.data.user?.department,
          Validators.required
        ),
      });

      console.log(this.form.get('department')?.value);
    }
  }

  onCancelButtonClick() {
    this.hideDialogEE.emit();
  }

  onConfirmButtonClick() {
    if (this.data.type === DialogType.Save) {
      this.changesSavedEE.emit(this.data.user);
    } else if (this.data.type === DialogType.Remove) {
      this.removedRowEE.emit({
        user: this.data.user,
        rowIndex: this.data.rowIndex,
      });
    }
  }
}

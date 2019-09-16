import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IMovie } from '@store/models/muvie.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {

  @Input() public movie: IMovie;
  @Output() result: EventEmitter<string> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  public confirm(): void {
    this.result.emit('CONFIRM');
    this.activeModal.close();
  }

}

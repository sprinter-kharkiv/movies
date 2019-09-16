import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMovie } from '@store/models/muvie.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailListComponent {
  @Input() public movie: IMovie;
  constructor(public activeModal: NgbActiveModal) { }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'yeah-dialog-base',
  templateUrl: './yeah-dialog-base.component.html',
  styleUrls: ['./yeah-dialog-base.component.css'],
  animations: [
    trigger('dialog-animation', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class YeahDialogBaseComponent {

  @Input() closable: boolean;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean>;

  constructor () {
    this.closable = true;
    this.visible = false;
    this.visibleChange = new EventEmitter<boolean>();
  }

  close () {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-lists',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatIconModule
    ],
    templateUrl: './lists.component.html'
})
export class ListsComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}

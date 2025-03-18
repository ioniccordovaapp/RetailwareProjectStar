import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu',
    imports: [IonicModule, FormsModule],
  
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() appPages: any[] = [];
  @Input() showMenu: boolean = true;
}

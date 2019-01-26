import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Lista', icon: 'fas fa-list-ul', routerLink: ['/albums']},
      {label: 'Aggiungi', icon: 'fas fa-plus-circle', routerLink: ['/add-album']}
    ];
  }

}

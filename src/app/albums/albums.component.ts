import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album';
import { AlbumService } from '../album.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[];
  selectedAlbum: Album;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  imageBlobUrl: string | null = null;

  constructor(private service: AlbumService, private router: Router, private messageService: MessageService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
   this.getAlbums();

   this.sortOptions = [
    {label: 'Prima i più recenti', value: '!anno'},
    {label: 'Prima i più vecchi', value: 'anno'},
    {label: 'Titolo', value: 'titolo'},
    {label: 'Artista', value: 'artista'},
  ];

  }

  getAlbums() {
    this.service.getAlbums().subscribe(data => {
        this.albums = <Album[]> data;
      },
      (error) => {
        console.log(error.error.message);
        this.messageService.add({severity: 'error', summary: 'VinylCollection', detail: 'Impossibile caricare la collezione'});
      }
    );
  }

  selectAlbum(event: Event, album: Album) {
      this.selectedAlbum = album;
      this.displayDialog = true;
      event.preventDefault();
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedAlbum = null;
  }

  modificaAlbum(id) {
    this.router.navigate(['/edit-album', id]);
  }

  createImageFromBlob(image: any) {
    const reader = new FileReader();
    const blob = new Blob([new TextEncoder().encode(image.data)], {type: 'image/*'});
    if (blob) {
      return reader.readAsDataURL(blob);
    }
  }

}

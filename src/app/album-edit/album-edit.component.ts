import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: any = {};
  uploadedFiles: any[] = [];
  immagini: any[] = [];

  constructor(private service: AlbumService, private router: Router, private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAlbum(this.route.snapshot.params['id']);
  }

  getAlbum(id) {
    this.service.getAlbum(id).subscribe(data => {
      this.album = data;
    });
  }

  onUploadComplete(event: any) {
    const response = JSON.parse(event.xhr.response);
    for (const res of response) {
      this.immagini.push(res.id);
    }
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'VinylCollection', detail: 'Immagine/i caricata/i'});
  }

  updateAlbum(albumToMod, data) {
    this.service.updateAlbum(albumToMod).subscribe(res => {
      const payload = {
        album: res['id'],
        immagini: this.immagini
      };
      this.service.updateImagesForAlbum(payload).subscribe(
        (result) => {
          const nr = res['id'];
          this.router.navigate(['/album-detail', nr]);
          this.messageService.add({severity: 'success', summary: 'VinylCollection', detail: 'Album modificato'});
        }
      );
    }, (err) => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'VinylCollection', detail: 'Errore durante il salvataggio'});
      }
    );
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(res => {
        this.router.navigate(['/albums']);
        this.messageService.add({severity: 'success', summary: 'VinylCollection', detail: 'Album cancellato'});
      }, (err) => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'VinylCollection', detail: 'Errore durante la cancellazione'});
      }
    );
  }

  validateText(text): boolean {
    if (text !== undefined && text.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  validateYear(year): boolean {
    const regex = '^[0-9]*$';
    if (year === undefined || year.match(regex)) {
      return false;
    } else {
      return true;
    }
  }

}

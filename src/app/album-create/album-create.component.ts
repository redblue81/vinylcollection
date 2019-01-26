import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  album: any = {};
  uploadedFiles: any[] = [];
  immagini: any[] = [];

  constructor(private service: AlbumService, private router: Router, private messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit() {
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

  uploadFile(event: any) {

    console.log(event);

    const url = 'http://localhost:8080/vinylcollection/api/images/upload-multiple-images';
    const httpUploadOptions = {
      headers: new HttpHeaders({'Accept': 'application/json'})
    };

    const formData: FormData = new FormData();
    formData.append('images[]', event.files);

    this.http.post(url, formData, httpUploadOptions).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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

  saveAlbum() {
    this.service.createAlbum(this.album).subscribe(res => {
          const payload = {
            album: res['id'],
            immagini: this.immagini
          };
          this.service.updateImagesForAlbum(payload).subscribe(
            (result) => {
              const nr = res['id'];
              this.router.navigate(['/album-detail', nr]);
              this.messageService.add({severity: 'success', summary: 'VinylCollection', detail: 'Album salvato'});
            }
          );
        }, (err) => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'VinylCollection', detail: 'Errore durante il salvataggio'});
        }
      );
  }

}

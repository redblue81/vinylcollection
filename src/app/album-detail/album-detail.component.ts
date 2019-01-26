import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  album: any = {};

  constructor(private service: AlbumService, private router: Router, private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAlbumDetail(this.route.snapshot.params['id']);
  }

  getAlbumDetail(id) {
    this.service.getAlbum(id).subscribe(data => {
      this.album = data;
    });
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'VinylCollection', detail: 'Album cancellato'});
          this.router.navigate(['/albums']);
        }, (err) => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'VinylCollection', detail: 'Errore durante la cancellazione'});
        }
      );
  }

  goToAlbums() {
    this.router.navigate(['/albums']);
  }

}

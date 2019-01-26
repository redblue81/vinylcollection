import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlbumService {
  private baseUrl = 'http://localhost:8080/vinylcollection/api';
  private imageUrl = 'http://localhost:8080/vinylcollection/api/images';

  headerFilter: string;

  constructor(private http: HttpClient) {}

  setHeaderFilter(filter) {
    this.headerFilter = filter;
  }

  getHeaderFilter() {
    return this.headerFilter;
  }

  /*
  getAlbums(page: number, sortElem: string) {
    return this.http.get(
      this.baseUrl + '/albums?page=' + page + '&size=5&sort=' + sortElem
    );
  }
  */

  getAlbums() {
    return this.http.get(this.baseUrl + '/albums');
  }

  getAlbum(id) {
    return this.http.get(this.baseUrl + '/album/' + id);
  }

  deleteAlbum(id) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  updateAlbum(albumToMod) {
    return this.http.put(this.baseUrl + '/update', albumToMod);
  }

  createAlbum(newAlbum) {
    return this.http.post(this.baseUrl + '/create', newAlbum);
  }

  searchAlbumByTitolo(titolo) {
    return this.http.get(this.baseUrl + '/search-album/' + titolo);
  }

  updateImagesForAlbum(payload) {
    return this.http.post(this.imageUrl + '/update-images', payload);
  }

}

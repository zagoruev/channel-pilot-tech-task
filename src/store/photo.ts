import { defineStore } from "pinia";
import type { Photo } from "../types/photo";
import type { Album } from "../types/album";

interface State {
  photos: Photo[];
  loading: boolean;
  error: null | string;
}

export const usePhotoStore = defineStore("photo", {
  state: (): State => ({
    photos: [],
    loading: false,
    error: null,
  }),
  actions: {
    assignAlbumToPhoto(photo: Photo, album: Album) {
      const targetPhoto = this.photos.find((el) => el.id === photo.id);
      if (targetPhoto) {
        targetPhoto.albumId = album.id;
      }
    },
    async fetchPhotos() {
      this.photos = [];
      this.loading = true;

      try {
        this.photos = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5"
        ).then((response) => response.json());
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});

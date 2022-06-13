import { defineStore } from "pinia";
import type { Album } from "../types/album";

interface State {
  albums: Album[];
  loading: boolean;
  error: null | string;
}

export const useAlbumStore = defineStore("album", {
  state: (): State => ({
    albums: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAlbums() {
      this.albums = [];
      this.loading = true;

      try {
        this.albums = await fetch(
          "https://jsonplaceholder.typicode.com/albums?_start=0&_limit=3"
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

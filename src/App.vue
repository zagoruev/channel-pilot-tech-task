<script setup lang="ts">
import { ref, reactive, onMounted, computed, type Ref } from "vue";
import { storeToRefs } from "pinia";

import type { Coords } from "@/types/coords";
import type { Photo } from "@/types/photo";
import type { Album } from "@/types/album";
import type { ConnectorDotComponent } from "@/types/connector-dot-component";

import { usePhotoStore } from "@/store/photo";
import { useAlbumStore } from "@/store/album";

import { getRelativeCenterPosition } from "@/utils/getRelativeCenterPosition";
import { useRelativeMousePosition } from "@/composables/useRelativeMousePostion";

import AppColumn from "@/components/AppColumn.vue";
import AlbumThumb from "@/components/AlbumThumb.vue";
import PhotoThumb from "@/components/PhotoThumb.vue";
import ConnectorDot from "@/components/ConnectorDot.vue";
import ConnectorsCanvas from "@/components/ConnectorsCanvas.vue";

const container = ref(null);

const { photos } = storeToRefs(usePhotoStore());
const { fetchPhotos, assignAlbumToPhoto } = usePhotoStore();

const { albums } = storeToRefs(useAlbumStore());
const { fetchAlbums } = useAlbumStore();

onMounted(() => {
  fetchPhotos();
  fetchAlbums();
});

const startPosition = ref<Coords | null>(null);
const mousePosition = useRelativeMousePosition(container);

const currentConnection = reactive<{
  photo: Photo | null;
  album: Album | null;
}>({
  photo: null,
  album: null,
});

const startConnection = (object: Album | Photo, e: MouseEvent) => {
  if (container.value) {
    startPosition.value = getRelativeCenterPosition(
      e.currentTarget as HTMLElement,
      container.value
    );
    if ((object as Photo).url) {
      Object.assign(currentConnection, {
        photo: object,
      });
    } else {
      Object.assign(currentConnection, {
        album: object,
      });
    }

    document.addEventListener("mouseup", dropConnection);
  }
};

const endConnection = (object: Album | Photo) => {
  if ((object as Photo).url) {
    Object.assign(currentConnection, {
      photo: object,
    });
  } else {
    Object.assign(currentConnection, {
      album: object,
    });
  }
  if (currentConnection.photo && currentConnection.album) {
    assignAlbumToPhoto(currentConnection.photo, currentConnection.album);
  }
  dropConnection();
};

const dropConnection = () => {
  startPosition.value = null;
  document.removeEventListener("mouseup", dropConnection);
};

const existingConnections = computed(() => {
  const connections: [Coords, Coords][] = [];
  photos.value.forEach((photo) => {
    if (photo.albumId) {
      const photoDot = photoElements.value.find(
        (el: ConnectorDotComponent) => el.id === photo.id
      );
      const AlbumDot = albumElements.value.find(
        (el: ConnectorDotComponent) => el.id === photo.albumId
      );
      if (photoDot && AlbumDot && container.value) {
        connections.push([
          getRelativeCenterPosition(photoDot.el, container.value),
          getRelativeCenterPosition(AlbumDot.el, container.value),
        ]);
      }
    }
  });

  return connections;
});

const albumElements = ref([]);
const photoElements = ref([]);
</script>

<template>
  <div class="flex justify-center font-sans text-gray-700 antialiased">
    <div class="min-h-screen flex py-6 relative" ref="container">
      <connectors-canvas
        :start="startPosition"
        :mouse="mousePosition"
        :connections="existingConnections"
      />
      <app-column title="Albums">
        <album-thumb v-for="album in albums" :key="album.id" :album="album">
          <connector-dot
            position="right"
            @mouseup="endConnection(album)"
            @mousedown="startConnection(album, $event)"
            :id="album.id"
            ref="albumElements"
          />
        </album-thumb>
      </app-column>
      <app-column title="Photos">
        <photo-thumb v-for="photo in photos" :key="photo.id" :photo="photo">
          <connector-dot
            @mouseup="endConnection(photo)"
            @mousedown="startConnection(photo, $event)"
            :id="photo.id"
            ref="photoElements"
          />
        </photo-thumb>
      </app-column>
    </div>
  </div>
</template>

<style scoped>
.column {
  min-width: 20rem;
  width: 20rem;
}
</style>

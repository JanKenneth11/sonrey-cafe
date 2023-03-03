<template>
  <ion-app>
    <menu-component></menu-component>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import MenuComponent from './views/components/MenuComponent.vue';
export default {
  name: 'app',
  components: {
    IonApp,
    IonRouterOutlet,
    MenuComponent
  }
};
</script>

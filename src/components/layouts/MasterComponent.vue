<template>
<div class="app">
    <HeaderComponent />
    <LeftMenu />
    <div class="main-content">
      <section class="section">
        <div class="section-body">
          <BreadCrumb/>
          <!-- add content here -->
          <router-view></router-view>
        </div>
      </section>
      <SiteSetting/>
    </div>
    <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
import LeftMenu from "./LeftMenu.vue";
import FooterComponent from "./FooterComponent.vue";
import SiteSetting from "./SiteSetting.vue";
import BreadCrumb from "../BreadCrumb.vue";
export default {
  name: "MasterComponent",
  components: {
    HeaderComponent,
    LeftMenu,
    FooterComponent,
    SiteSetting,
    BreadCrumb
},
};
</script>

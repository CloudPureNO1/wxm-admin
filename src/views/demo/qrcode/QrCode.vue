<template>
    <div class="wxm-qr-code">
        <qrcode-vue :value="value" :size="size" level="H"/>
    </div>
</template>
<script lang="ts" setup>
 import QrcodeVue from 'qrcode.vue'
 const value='12121212'
 const size=300
</script>

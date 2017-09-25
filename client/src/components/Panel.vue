<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="blue" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="action" />
    </v-toolbar>

    <div class="pl-4 pr-4 pt-4 pb-4">
      <slot>
        no slot content
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style>

</style>

<template>
  <div>
    <label>{{ label }}</label>
    <span v-show='touched && !valid'>{{ invalidMsg }}</span>
    <input v-model='value' :type="type" :name='name' />
  </div>
</template>

<style scoped lang="sass">
</style>

<script src='./Input' />

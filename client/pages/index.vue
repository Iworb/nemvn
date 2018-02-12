<template>
    <div>
        Hello #{{ counter }}
    <button @click="counter = counter +1">+1</button>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          counter: 0
        }
      }
    }
</script>

<style lang="stylus">
    div
        background-color lightblue
</style>
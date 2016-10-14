export default {
  name: 'vuex-form',
  methods: {
    submit(event) {
      event.preventDefault()

      this.$children.forEach(child => {
        if (child.$options.name.includes('vuex-form-')) {
          child.touched = true
          console.log(child.value)
        }
      })
    }
  }
}

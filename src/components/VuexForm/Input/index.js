import capitalize from 'lodash/capitalize'

export default {
  name: 'vuex-form-input',
  props: {
    label: {
      type: String,
      default(value) {
        return value || capitalize(this.$options.propsData.name)
      }
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      value: '',
      touched: false,
      invalidMsg: 'Required'
    }
  },
  computed: {
    valid() {
      return this.value.length
    }
  },
  watch: {
    value() {
      this.touched = true
    }
  }
}

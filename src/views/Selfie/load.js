import SelfieView from '../Selfie.vue'

export default function selfieLoad(component = false) {
  return {
    name: 'selfie-load',
    render(h) {
      return h(SelfieView, { props: { component: component } })
    }
  }
}

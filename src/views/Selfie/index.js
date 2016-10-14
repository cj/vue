import { AppHeader, AppFooter } from 'components/App'
import logoImage from 'assets/images/logo.png'

import SelfieClaimView from './Claim.vue'

export default {
  name: 'selfie-view',
  props: {
    component: String
  },
  data() {
    return {
      logoImage,
    }
  },
  components: {
    AppHeader,
    AppFooter,
    claim: SelfieClaimView
  }
}

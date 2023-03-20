import 'semantic-ui-css/semantic.min.css'
import "@/scss/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvided, CartProvided } from '@/contexts';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvided>
      <CartProvided>
        <Component {...pageProps} />
      </CartProvided>
    </AuthProvided>
  )
}

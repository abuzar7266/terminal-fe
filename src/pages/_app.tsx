import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '@/store';


const wrapper = createWrapper(()=>store);

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { store } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}> 
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;
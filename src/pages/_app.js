import {Provider} from 'react-redux';
import Head from 'next/head';
import '../app/globals.css';
import store from '../lib/store';
import Layout from "../components/Layout";


function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Head>
                <title>Kruzer Bookstore</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
import React from "react";
import App from "next/app";
import Head from "next/head";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Header } from "semantic-ui-react";
import { ApolloProvider } from "@apollo/react-hooks";
import { StoreProvider } from "easy-peasy";
import store from "../store";

const Padding = styled.div`
  padding: 3rem;
`;

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <StoreProvider store={store}>
          <Head>
            <title>Namubufferi</title>
            <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            />
          </Head>
          <Padding>
            <Component {...pageProps} />
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Hyvää 20v syntymäpäivää Athene. <br />
              T. DADA ry ja killan oma Peksi
            </p>
          </Padding>
        </StoreProvider>
      </>
    );
  }
}

export default MyApp;

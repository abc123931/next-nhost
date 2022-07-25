import "../src/style/index.css";

import { NhostClient, NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { AuthProvider } from "src/component/AuthProvider";

const nhost = new NhostClient({
  backendUrl: "http://localhost:1337",
});

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <Head>
          <title>nexst</title>
        </Head>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  );
};

export default App;

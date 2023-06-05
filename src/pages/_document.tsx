import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="NeuroScanner" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NeuroScanner" />
        <meta
          name="description"
          content="A simple application that takes in Brain MRI scans and detects tumor and dementia using AI algorithms"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#228895" />
        <meta name="msapplication-tap-highlight" content="#214551" />
        <meta name="theme-color" content="#214551" />

        <link rel="apple-touch-icon" href="/ios/192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/ios/512.png" color="#228895" />
        <link rel="shortcut icon" href="/brain.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="NeuroScanner" />
        <meta
          name="twitter:description"
          content="A simple application that takes in Brain MRI scans and detects tumor and dementia using AI algorithms"
        />
        <meta name="twitter:image" content="/ios/192.png" />
        <meta name="twitter:creator" content="@DemonOVRLRD" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NeuroScanner" />
        <meta
          property="og:description"
          content="A simple application that takes in Brain MRI scans and detects tumor and dementia using AI algorithms"
        />
        <meta property="og:site_name" content="NeuroScanner" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/ios/192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

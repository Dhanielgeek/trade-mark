import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = '5b01725cc9f7f93d66b5b3db72703a608cd6997f';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// <!-- Smartsupp Live Chat script -->
// <script type="text/javascript">
// var _smartsupp = _smartsupp || {};
// _smartsupp.key = '5b01725cc9f7f93d66b5b3db72703a608cd6997f';
// window.smartsupp||(function(d) {
//   var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
//   s=d.getElementsByTagName('script')[0];c=d.createElement('script');
//   c.type='text/javascript';c.charset='utf-8';c.async=true;
//   c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
// })(document);
// </script>
// <noscript> Powered by <a href=“https://www.smartsupp.com” target=“_blank”>Smartsupp</a></noscript>

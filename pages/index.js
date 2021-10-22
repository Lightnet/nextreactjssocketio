console.log("server side render");

import { useEffect } from 'react';
import Script from 'next/script'

// import { loadEnvConfig } from '@next/env'
// https://nextjs.org/docs/basic-features/environment-variables
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
/*
export async function getServerSideProps(context) {

  return {
    props: {}, // will be passed to the page component as props
  }
}
*/
// https://nextjs.org/docs/api-reference/data-fetching/getInitialProps

export async function getStaticProps() {
  //console.log("process.env.DB_HOST",process.env.DB_HOST);
  //console.log("process.env.DB_USER",process.env.DB_USER);
  //console.log("process.env.DB_PASS",process.env.DB_PASS);
  console.log("process.env.PORT",process.env.PORT);
  
  //const db = await myDB.connect({
    //host: process.env.DB_HOST,
    //username: process.env.DB_USER,
    //password: process.env.DB_PASS,
  //})
  
  return {
    props:{

    }
  }
}

// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
function HomePage() {
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log('hello', data)
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })

    fetch('/api/user').finally(() => {

    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (<>
    <head>
      <Script 
        src="/socket.io/socket.io.js"
        strategy="beforeInteractive" // lazyOnload, afterInteractive
        onLoad={() => {
          console.log("Loaded");
          // If loaded successfully, then you can load other scripts in sequence
        }}
      />
    </head>
    <div>Welcome to Next.js!</div>
    </>);
}

export default HomePage
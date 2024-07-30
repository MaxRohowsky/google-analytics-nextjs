import '@/styles/globals.css';

import React, { Suspense } from 'react';

import GoogleAnalytics from '@/components/google-analytics';
import CookieBanner from '@/components/cookie-banner';


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID='G-1CHMGCDEXS' />
      </Suspense>
      <body className='flex flex-col items-center justify-center'>
          {children}
          <CookieBanner />

      </body>
    </html>
  )
}
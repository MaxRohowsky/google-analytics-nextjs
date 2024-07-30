import '@/styles/globals.css';

import React, { Suspense } from 'react';
import GoogleAnalytics from '@/components/google-analytics';
import CookieBanner from '@/components/cookie-banner';


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID='G-1234567890' />
      </Suspense>
      <body className='container'>
          {children}
          <CookieBanner />

      </body>
    </html>
  )
}
export default async function Home() {


  return (
    <>
      <h1>
        Google Analytics (GA4) implementation <br />in Next.JS 14 (App Router)
        with Opt-in Cookie Banner
      </h1>

      <p>
        This is a minimal example of Google Analytics (GA4) in
        Next.JS 14 with an opt-in cookie banner.
      </p>

      <p>
        Setup: 
      </p>

      <ol>
        <li>Install the node modules with "npm install".</li>
        <li>Replace the Google Analytics ID "GA_MEASUREMENT_ID" in the layout.tsx file with your own.</li>
        <li>Run the development server with "npm run dev".</li>
      </ol>
      

      <p>
        Information:
      </p>

      <ul>
        <li>The cookie key (i.e. name) is "cookie_consent" and the value is set to true or false when you click Accept or Decline, respectively.</li> 
        <li>The cookie is stored in local storage. If you Accept or Decline the Cookie, you'll have to delete it from local storage to reset the banner.</li>
      </ul>
      
      <p>
        Demo:
      </p>
      <img className="responsive-image" src="/demo.gif" alt="Demo" />
      

    </>
  )
}




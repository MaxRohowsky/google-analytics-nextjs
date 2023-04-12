import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { gql } from '@apollo/client';
import { getApolloClient } from '../components/client';
import Socials from '@/components/Socials';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home({ firstPost, firstCourse }) {
  
  console.log(firstPost.uri)

  function MyButton(link) {
    return (
      <Link style={{ textDecoration: 'none' }} className={styles.cta} href={link}>
        Start Learning
      </Link>
    );
  }

 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.center}>
      <div className={styles.main}>
        <div>
          <p>About</p>
          <h2 className={styles.tagline}>Learn code. Build your&nbsp;<span className={styles.typewriter}></span></h2>
          <h4>Welcome to max teaches tech. Here you'll find free and quality coding tutorials!</h4>
          
          {MyButton("/courses")}
          
          

          

          <p>Socials</p>
          <Socials />
        </div>

        <div className={styles.rightSide}>
          <p>Latest</p>

          <Link style={{ textDecoration: 'none' }} className={styles.latest} href={"/blog"+firstPost.uri}>
          <div className={styles.container}>
            <img className={styles.featured__img} src={firstPost.featuredImage.node.mediaItemUrl} />
            <div className={styles.featured__text}>
              <h2 className={styles.featured__title}> {firstPost.title} </h2>
              <h4 className={styles.featured__date}> Blog | {dateTime(firstPost.date)} </h4>
              <h3 className={styles.featured__excerpt} dangerouslySetInnerHTML={{
                __html: firstPost.excerpt
              }} />
            </div>
          </div>
          </Link>
          
          <Link style={{ textDecoration: 'none' }} className={styles.latest} href={firstCourse.uri}>
          <div className={styles.container}>
            <img className={styles.featured__img} src={firstCourse.categories.nodes[0].categoryImages.categoryImage.sourceUrl} />
            <div className={styles.featured__text}>
              <h2 className={styles.featured__title}> {firstCourse.categories.nodes[0].name} </h2>
              <h4 className={styles.featured__date}> Courses | {dateTime(firstCourse.date)} </h4>
              <h3 className={styles.featured__excerpt} dangerouslySetInnerHTML={{
                __html: firstCourse.categories.nodes[0].description
              }} />
            </div>
          </div>
          </Link>

        </div>
      </div>



      </main>
    </>
  )
}

function dateTime(input) {
  const dateTime = new Date(input);
  const formattedDateTime = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric' /*,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false */
  }).format(dateTime);

  return (formattedDateTime)
}


export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
    {
      posts(first: 1) {
        edges {
          node {
            id
            link
            slug
            uri
            title
            date
            excerpt
                    featuredImage {

          node {
            mediaItemUrl}}
          }
        }
      }
    }
    `
  });

  const data2 = await apolloClient.query({
    query: gql`
    {
      courses(first: 1) {
        edges {
          node {
            categories {
              nodes {
                description
                name
                categoryImages {
                  categoryImage {
                    sourceUrl
                  }
                }
              }
            }
            date
            uri
          }
        }
      }
    }
    `
  });

  const firstPost = { ...data?.data.posts.edges[0].node }
  const firstCourse = {...data2?.data.courses.edges[0].node}

  return {
    props: {
      firstPost,
      firstCourse
    }
  }
}

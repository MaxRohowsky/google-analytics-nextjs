import Head from 'next/head'
//import Image from 'next/image'
//import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { gql } from '@apollo/client';
import { getApolloClient } from '../components/client';
import Socials from '@/components/Socials';
import Link from 'next/link'
import { dateTime } from '../components/datetime.js';

//const inter = Inter({ subsets: ['latin'] })

export default function Home({ firstPost, firstCourse }) {

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
        <title>Max Teaches Tech Homepage</title>
        <meta name="description" content="Quality Code Tutorials" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.center}>
      <div className={styles.main}>

        <div className={styles.about}>
          <h3>About</h3>
          <h2 className={styles.tagline}>Learn code. Build your</h2>
          <h2 className={styles.tagline}><span className={styles.typewriter}></span></h2>
          <h4>Welcome to max teaches tech. Here you'll find free and quality coding tutorials!</h4>
          
          {MyButton("/courses")}
          
          
          <h3>Socials</h3>
          <Socials />
        </div>



        <div className={styles.rightSide}>
          <h3>Latest</h3>

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

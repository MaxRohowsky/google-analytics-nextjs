import Head from 'next/head'
import Link from 'next/link'
import { gql } from "@apollo/client";
import { getApolloClient } from '../../components/client';
import Socials from '@/components/Socials';
import styles from '../../styles/Post.module.scss'
import { parse } from 'node-html-parser';


export default function Course({ post, site }) {

  const doc = parse(post.excerpt);
  const excerptText = doc.querySelector("p").text;

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={excerptText} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.post}>
      <div className={styles.post__content}>
        <h1 className={styles.title}>
          {post.title}
        </h1>
        <Socials />

        <div className={styles.post__text}>
          <div dangerouslySetInnerHTML={{
            __html: post.content
          }} />
        </div>
      </div>

        <p>
          <Link href="/">
              Back to home
          </Link>
        </p>
      </main>
    </div>
  )
}


export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params; // the params contains the slug and since the page is called [course] the const here needs to be called course too.
  const apolloClient = getApolloClient();



  const data = await apolloClient.query({
    /* Remember that name = slug */
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
          excerpt
      }
    }`,
    variables: {
      slug: postSlug
    }
  });

  const post = data?.data.postBy;

  if (!post) {
    return {
      props: {},
      notFound: true
    }
  }

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      post,
      site
    }
  }


}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

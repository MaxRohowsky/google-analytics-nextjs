import { useRouter } from 'next/router'
//import { ApolloClient, InMemoryCache } from "@apollo/client";
//import { ApolloProvider } from "@apollo/client";
import { gql } from "@apollo/client";
//import client from "../lib/client";
import { getApolloClient } from '../../lib/client';
import Socials from '@/components/Socials';
import Sidebar from '@/components/Sidebar';
import Script from 'next/script'


export default function Course({ courseData,  sidebarData }) {

  //console.log(sidebarData)

  //console.log(econtent)

  return (
    <>
      <main className="post wp-embed-responsive" >

        <div className="post__content">
          <h1 className="post__title" dangerouslySetInnerHTML={{ __html: courseData.title }} />

  <div className="post__text" dangerouslySetInnerHTML={{ __html: courseData.content }} />

          <Socials />
          
        </div>
        <div className="post__sidebar">
          <Sidebar data={sidebarData}/>
        </div>
      </main>
    </>
  )
}
//category={category}


export async function getStaticProps({ params = {} } = {}) {
  const { category, course } = params; // the params contains the slug and since the page is called [course] the const here needs to be called course too.
  const apolloClient = getApolloClient();


  const data = await apolloClient.query({
    query: gql`
      query GetCourseData($slug: String!){
        courses(where: {name: $slug}) {
            edges {
            node {
              slug
              title
              content
              id
              categories{
                nodes{
                  id
                  name
                  categoryId
                  uri
                }
              }
            }
          }
        }
      }
      `,
    variables: {
      slug: course
    }
  });

  // For the sidebar. For a category, get courses with corresp. title, link, menuO.
  const data2 = await apolloClient.query({
    query: gql`
    query GetSidebarData($slug: [String]){
      categories(where: {slug: $slug}){
          nodes {
              courses {
                  edges {
                      node {
                          id
                          title
                          slug
                          menuOrder
                          uri
                          link
                      }
                  } 
              }
          }
      }
  }
      `,
      variables: {
        slug: category
      }
  });


  /*function execute(content){
    const cont = content
    return(
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js">
      
      <div className="post__text" dangerouslySetInnerHTML={{ __html: cont }} />
      <script>hljs.highlightAll();</script>
      </Script>
      
    )
  
  }*/

  const courseData = data?.data.courses.edges[0].node

  const sidebarData = data2?.data.categories.nodes[0].courses.edges
  //const sidebarData = data2
  //const title = data?.data.courses.edges[0].node.title;
  //const content = data?.data.courses.edges[0].node.content;
  //const category = data?.data.courses.edges[0].node.categories.nodes[0].id;
  //const sidebarData = data2?.data.categories.nodes
 
  //const econtent = String(execute(content));





  return {
    props: {
      courseData, 
      sidebarData
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
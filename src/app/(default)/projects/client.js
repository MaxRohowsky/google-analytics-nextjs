'use client'
import Card from "@/components/pcard/card"
import styles from './projects.module.scss'
//import { faYoutube, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
//import { faReact, faJs, faHtml5, faCss3, faPython , faWordpress} from "@fortawesome/free-brands-svg-icons";
// {[{ tag: '#React', color: 'red' }, { tag: '#JS', color: 'red' }, { tag: '#JS', color: 'red' }, { tag: '#JS', color: 'red' }, { tag: '#JS', color: 'red' }, { tag: '#JS', color: 'red' }]}

export default function Client({ courses, pageInfo }) {

    let cardItems = [];

    cardItems.push(

        <Card
            key={1}
            title={"Twitter (X) Font Editor"}
            tags={[
                { tag: '#HTML', color: '#E34C26' }, 
                { tag: '#JS', color: '#F7DF1E' }, 
                { tag: '#CSS', color: '#1F73B8' }, 
                { tag: '#MV3', color: '#000000' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Google Chrome Extension that Enables 𝗕𝗼𝗹𝗱, 𝐼𝑡𝑎𝑙𝑖𝑐, and U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ Fonts on Twitter X Posts by making use of Unicode characters"}
            link={"https://github.com/maxontech/twitter-font-editor"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={2}
            title={"Click to Copy"}
            tags={[
                { tag: '#HTML', color: '#E34C26' }, 
                { tag: '#CSS', color: '#1F73B8' }, 
                { tag: '#JQuery', color: '#0769AD' }, 
                { tag: '#MV3', color: '#000000' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Google Chrome Extension that allows you to selectively Copy Text, Urls, and CSS with one Click"}
            link={"https://github.com/maxontech/click-to-copy"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={3}
            title={"GitPro"}
            tags={[
                { tag: '#HTML', color: '#E34C26' }, 
                { tag: '#TailwindCSS', color: '#38B2AC' }, 
                { tag: '#JS', color: '#F7DF1E' }, 
                { tag: '#GitHubActions', color: '#2088FF' }, 
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Showcase website for unique and beautiful GitHub profiles that is fully automated using GitHub Actions"}
            link={"https://maxontech.github.io/best-github-profile-readme/"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={4}
            title={"LinkedIn Font Editor"}
            tags={[
                { tag: '#HTML', color: '#E34C26' }, 
                { tag: '#CSS', color: '#F7DF1E' }, 
                { tag: '#JS', color: '#F7DF1E' }, 
                { tag: '#JQuery', color: '#2088FF' }, 
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Google Chrome Extension that Enables 𝗕𝗼𝗹𝗱, 𝐼𝑡𝑎𝑙𝑖𝑐, and U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ Fonts on LinkedIn Posts"}
            link={"https://maxontech.io/linkedin-font-editor"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={5}
            title={"LandingHero"}
            tags={[
                { tag: '#React', color: '#61DAFB' }, 
                { tag: '#JSX', color: '#F7DF1E' }, 
                { tag: '#Puppeteer', color: '#40B5A6' },
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Automated Website to Showcase Beautiful Landing Pages for Startups and Businesses"}
            link={"https://landing-page-design-examples.vercel.app/"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={6}
            title={"NEFT Flappy Bird"}
            tags={[
                { tag: '#Python', color: '#3776AB' },
                { tag: '#PyGame', color: '#40B5A6' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Neuroevolution with Fixed Topologies (NEFT) implemented in the Flappy Bird without using any Machine Learning Libraries"}
            link={"https://github.com/maxontech/neft-flappy-bird"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={7}
            title={"Drive AI"}
            tags={[
                { tag: '#Python', color: '#3776AB' },
                { tag: '#PyGame', color: '#40B5A6' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Neuroevolution with Augmenting Topologies (NEFT) implemented in a Self-Driving Car Simulation"}
            link={"https://github.com/maxontech/DriveAI"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={8}
            title={"NEAT Chrome Dinosaur"}
            tags={[
                { tag: '#Python', color: '#3776AB' },
                { tag: '#PyGame', color: '#40B5A6' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Neuroevolution with Augmenting Topologies (NEAT) implemented in Chrome Dinosaur Game"}
            link={"https://github.com/maxontech/neat-chrome-dinosaur"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={9}
            title={"Dijkstra Pathfinding Visualizer"}
            tags={[
                { tag: '#Python', color: '#3776AB' },
                { tag: '#PyGame', color: '#40B5A6' }
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Simple Pathfinding Visualizer using Dijkstra's Algorithm"}
            link={"https://github.com/maxontech/dijkstra-pathfinding"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />,

        <Card
            key={10}
            title={"Programming Courses"}
            tags={[
                { tag: '#Diverse', color: '#61DAFB' }, 
            ]}
            img={courses[1].categoryImages.categoryImage.sourceUrl}
            body={"Programming tutorial write ups to teach myself and others about Python, JavaScript, and more"}
            link={"/courses/"} // courses/category/lesson e.g. courses/pycharm/pycharm-basics
        />

    )

    return (
        <>


            <div className={styles.container}>

                <h1 className={styles.title}>Projects</h1>

                <h4 className={styles.subtitle}>My Portfolio of Learning Projects </h4>

                <div className={styles.cards}>

                    {cardItems}

                </div>

            </div>

        </>

    )

}



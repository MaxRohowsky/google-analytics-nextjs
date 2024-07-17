'use server'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';





/**
 * Get the blog front matter of all blog posts.
 * @returns The front matter of all blog posts in an array.
 */
export async function getBlogFrontMatter(): Promise<BlogFrontMatter[]> {
    const dir = path.join(process.cwd(), 'src/app/(default)/blog/(posts)');
    const dirItems = fs.readdirSync(dir).filter(item => item !== 'layout.tsx');
    const frontMatter = dirItems.map((fileName) => {
        
        const fullPath = path.join(dir, fileName, "page.mdx");
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data } = matter(fileContents);

        // add slug to data
        data.slug = fileName.replace(".mdx", "");

        // format publishedOn date
        if (data.publishedOn) {
            try {
                data.publishedOn = format(new Date(data.publishedOn), 'EEEE, dd MMMM yyyy');
            } catch (error) {
                data.publishedOn = "Date Format can't be interpreted";
            }
        } else {
            data.publishedOn = 'Not yet published';
        }
        return data;
    }
    );
    return frontMatter as BlogFrontMatter[];
}


/**
 * Get the blog front matter based on the provided filters. Upper and lower case are ignored.
 * @param options The filter options e.g. { featured: true, tag: 'personal', layout: 'Article' }.
 * @returns The front matter of the filtered blog posts in an array.
 */
export async function getFilteredBlogFrontMatter(options: FrontMatterOptions = {}): Promise<BlogFrontMatter[]> {
    const frontMatter = await getBlogFrontMatter();

    const filteredFrontMatter = frontMatter.filter((fm) => {
        if (options.featured && !fm.featured) {
            return false;
        }

        if (options.tag && !options.tag.every(optionTag => fm.tags.map(tag => tag.toLowerCase()).includes(optionTag.toLowerCase()))) {
            return false;
        }

        if (options.layout && fm.layout.toLowerCase() !== options.layout.toLowerCase()) {
            return false;
        }

        if (options.isPublished && !fm.isPublished) {
            return false;
        }

        return true;
    });

    return filteredFrontMatter as BlogFrontMatter[];
}





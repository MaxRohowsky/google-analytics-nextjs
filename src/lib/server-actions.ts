
import { readdir, readFile } from 'node:fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import {pathToBlogPosts} from './utils';




/**
 * Get the blog front matter of all blog posts.
 * @returns The front matter of all blog posts in an array.
 */
export async function getAllBlogItems(): Promise<FrontMatter[]> {
    const dir = path.join(process.cwd(), pathToBlogPosts);
    const dirItems = await readdir(dir);
    const filteredItems = dirItems.filter(item => item !== 'layout.tsx');

    const frontMatter = await Promise.all(filteredItems.map(async (fileName) => {
        const fullPath = path.join(dir, fileName);
        const fileContents = await readFile(fullPath, "utf8");

        const { data } = matter(fileContents);

        // add slug to data
        data.slug = fileName.replace(".mdx", "");

        return data;
    }));

    return frontMatter as FrontMatter[];
}

/**
 * Get a single blog item by its unique slug.
 * @param slug The unique slug of the blog item.
 * @returns The blog item with the matching slug, or null if not found.
 */
export async function getBlogItemBySlug(slug: string): Promise<FrontMatter | null> {
    const blogItems = await getAllBlogItems();
    const normalizedSlug = slug.trim().toLowerCase();
    return blogItems.find(item => item.slug.toLowerCase() === normalizedSlug) || null;
}

/**
 * Get the blog front matter based on the provided filters. Upper and lower case are ignored.
 * @param options The filter options e.g. { featured: true, tag: 'personal', layout: 'Article' }.
 * @returns The front matter of the filtered blog posts in an array.
 */
export async function getFilteredBlogItems(options: Filter = {}): Promise<FrontMatter[]> {
    const blogItems = await getAllBlogItems();

    const filteredFrontMatter = blogItems.filter((item) => {

        if (options.tags && options.tags.length > 0 && !options.tags.every(optionTag => item.tags.map(tag => tag.toLowerCase()).includes(optionTag.toLowerCase()))) {
            return false;
        }

        return true;
    });

    return filteredFrontMatter;
}





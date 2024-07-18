'use client'

import { getFilteredProjects, getProjectTags } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Card from '@/components/card';
import { Checkbox } from "@/components/ui/checkbox"
import Title from '@/components/title/title';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/* export const metadata = {
  title: "Projects",
  description: "Portfolio Projects by Max on Tech"
} */

// https://codepen.io/creativeocean/pen/JjemXGY

export default function Projects() {

  const allTags = getProjectTags()

  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const displayTags = isFiltered ? selectedTags : undefined

  const projects = getFilteredProjects({ tags: displayTags });

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  const handleResetFilters = () => {
    setSelectedTags([]);
  }

  useEffect(() => {
    setIsFiltered(selectedTags.length > 0);
  }, [selectedTags, isFiltered]);


  return (
    <>

      <Title titles={['Projects'/* , 'Projets', '프로젝트', '项目', 'Проект' */]} top='85px' left='100px' />

      <Filter allTags={allTags} selectedTags={selectedTags} handleResetFilters={handleResetFilters} handleTagSelection={handleTagSelection} />

      <div className='grid gap-7 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] '>
        {projects.map((project) => (

          <Card key={project.slug} item={project} />


        ))}

      </div>



    </>



  );
}





function Filter({ allTags, selectedTags, handleResetFilters, handleTagSelection }) {
  return (
    <>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" w-28 lg:flex gap-2 my-4">
            <ListFilter /> Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className='  w-48 p-2 flex flex-col gap-2 justify-between'>
          <Button
            variant="secondary"
            className='w-full hover:bg-red-400 hover:text-white'
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>

          <ScrollArea className='h-52 pr-2'>
            <ul className='py-1 px-1 w-full mr-2 flex flex-col gap-2'>
              {allTags.map((tag) => (
                <li key={tag} className='flex flex-row gap-2 w-full items-center px-2 py-1 border border-neutral-100 rounded-md'>
                  <Checkbox className='border-none bg-neutral-100' checked={selectedTags.includes(tag)} id={tag} onCheckedChange={() => handleTagSelection(tag)} />
                  <label htmlFor={tag} className="w-full">
                    {tag}
                  </label>
                </li>
              ))}
            </ul>
          </ScrollArea>


        </PopoverContent>
      </Popover>


    </>
  );

}



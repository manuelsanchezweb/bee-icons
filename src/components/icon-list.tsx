import { useTheme } from '@/context/ThemeContext'
import usePagination from '@/hooks/usePagination'
import { Icon } from '@/types/types'
import {
  downloadSVG,
  filterIconsByCategory,
  filterIconsBySearchTerm,
  getUniqueCategories,
} from '@/utils/utils'
import { animate, stagger } from 'motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

const IconList = ({ icons }: { icons: Icon[] }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [displayedIcons, setDisplayedIcons] = useState<Icon[]>(icons)
  const [selectedTerm, setSelectedTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const allCategories = useMemo(() => getUniqueCategories(icons), [icons])

  const initialState = {
    currentPage: 1,
    pageSize: 21,
    total: displayedIcons.length,
  }
  const [state, actions] = usePagination(initialState)

  const isPrevDisabled = state.currentPage === 1
  const isNextDisabled =
    state.currentPage === Math.ceil(displayedIcons.length / state.pageSize) ||
    displayedIcons.length === 0

  const displayedIconsPaginated: Icon[] = useMemo(() => {
    const start = (state.currentPage - 1) * state.pageSize
    const end = state.currentPage * state.pageSize
    return displayedIcons.slice(start, end)
  }, [displayedIcons, state.currentPage, state.pageSize])

  useEffect(() => {
    let filteredIcons = icons

    if (selectedCategory !== '') {
      filteredIcons = filterIconsByCategory(filteredIcons, selectedCategory)
    }

    if (selectedTerm !== '') {
      filteredIcons = filterIconsBySearchTerm(filteredIcons, selectedTerm)
    }

    actions.jumpToPage(1)

    setDisplayedIcons(filteredIcons)

    const li = document.querySelectorAll('li')
    if (!li[0]) return

    animate(
      li,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: 'ease-in-out' }
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerm, selectedCategory])

  const searchTerm = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    setSelectedTerm((e.target as HTMLInputElement).value)
  }, [])

  return (
    <div className="list-shadow px-8 pt-12 pb-24 rounded-[40px] mb-24">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-16 ">
        <input
          className="ml-2 pl-2 h-[42px] rounded-md bee-blue-border md:w-[460px] dark:text-black"
          type="text"
          name="search"
          defaultValue={selectedTerm}
          onKeyUp={searchTerm}
          placeholder="Search Icon Here"
        />
        <div className="flex items-center">
          <label htmlFor="category-select">Category:</label>
          <select
            className="ml-2 h-[42px] appearance-none outline-none bg-transparent"
            name="category"
            id="category-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">all</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul
        className={`flex flex-wrap items-start gap-8 md:gap-x-24 ${
          displayedIconsPaginated.length > 0 ? '' : 'md:items-center'
        }  justify-center md:justify-start`}
      >
        {displayedIconsPaginated.length > 0 ? (
          displayedIconsPaginated
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((icon, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-center text-center gap-2"
              >
                <button
                  onClick={() => downloadSVG(icon, 'lg')}
                  className="hexa-shape hexa-shadow bg-gray-100 flex flex-col items-center justify-center min-w-[72px] w-[72px] min-h-[64px] transition-all hover:scale-110 focus:scale-110 focus:outline-none hover:bg-[var(--bee-blue)]"
                >
                  <div dangerouslySetInnerHTML={{ __html: icon.icon.lg }} />
                </button>
                <span
                  onClick={() => downloadSVG(icon, 'lg')}
                  className={`{${isDark} ? "bee-blue : "text-white"} text-[0.60rem] max-w-[65px] h-[20px] cursor-pointer font-medium`}
                >
                  {icon.name}
                </span>
              </li>
            ))
        ) : (
          <p className="text-center h-full flex justify-center items-center w-full">
            'Ups! No icons found. Try another search term.'
          </p>
        )}
      </ul>

      <div className="flex flex-col mt-12">
        <div className="flex justify-center gap-8">
          {!isPrevDisabled && (
            <button
              onClick={actions.prevPage}
              disabled={isPrevDisabled}
              className="disabled:text-gray-300 disabled:pointer-events-none"
            >
              Previous page
            </button>
          )}
          {!isNextDisabled && (
            <button
              onClick={actions.nextPage}
              disabled={isNextDisabled}
              className="disabled:text-gray-300 disabled:pointer-events-none"
            >
              Next page
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default IconList

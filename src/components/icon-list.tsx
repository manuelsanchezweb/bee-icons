import { useTheme } from '@/context/ThemeContext'
import usePagination from '@/hooks/usePagination'
import { Icon } from '@/types/types'
import {
  copyToClipboard,
  downloadSVG,
  filterIconsByCategory,
  filterIconsBySearchTerm,
  getUniqueCategories,
} from '@/utils/utils'
import { animate, stagger } from 'motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const IconList = ({ icons }: { icons: Icon[] }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
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
          displayedIconsPaginated.map((icon, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center text-center gap-2 relative"
            >
              <button
                onClick={() =>
                  setActiveIcon(activeIcon === icon.name ? null : icon.name)
                }
                className="hexa-shape hexa-shadow bg-gray-100 flex flex-col items-center justify-center min-w-[72px] w-[72px] min-h-[64px] transition-all hover:scale-110 focus:scale-110 focus:outline-none hover:bg-[var(--bee-blue)]"
              >
                <div dangerouslySetInnerHTML={{ __html: icon.icon.lg }} />
              </button>
              {activeIcon === icon.name && (
                <div className="dropdown-menu w-[100px] absolute top-0 left-1/2 -translate-x-1/2 lg:-right-24 lg:left-auto lg:top-0 lg:translate-x-0 shadow-sm border border-solid border-black bg-white flex flex-col z-[200]">
                  <button
                    className="flex gap-2 items-center hover:bg-gray-200 py-1 px-2"
                    onClick={() => {
                      copyToClipboard(icon, 'lg')
                      setActiveIcon(null)

                      toast.success('Copied to clipboard!', {
                        icon: '📋',
                      })
                    }}
                  >
                    <IconCopy extraClasses="h-3 w-3" />
                    <span className="text-[10px] text-black">Copy</span>
                  </button>
                  <button
                    className="flex gap-2 items-center hover:bg-gray-200 py-1 px-2"
                    onClick={() => downloadSVG(icon, 'lg')}
                  >
                    <IconDownload extraClasses="h-3 w-3" />
                    <span className="text-[10px] text-black">Download</span>
                  </button>
                </div>
              )}
              <span
                onClick={() =>
                  setActiveIcon(activeIcon === icon.name ? null : icon.name)
                }
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

const IconDownload = ({ extraClasses }: { extraClasses?: string }) => {
  return (
    <svg
      className={extraClasses}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#download-lg-clip)">
        <path
          d="M7.05457 11.7185L12.0513 17.0845M12.0513 17.0845L17.0482 11.7185M12.0513 17.0845V3.09265"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M4 19V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
      </g>
      <defs>
        <clipPath id="download-lg-clip">
          <rect width="24" height="24" fill="none"></rect>
        </clipPath>
      </defs>
    </svg>
  )
}

const IconCopy = ({ extraClasses }: { extraClasses?: string }) => {
  return (
    <svg
      className={extraClasses}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#copy-lg-clip)">
        <path
          d="M9 16V4C9 3.44772 9.44771 3 10 3H16.5507C16.804 3 17.048 3.09619 17.2332 3.26914L19.6825 5.55651C19.885 5.74563 20 6.01029 20 6.28737V16C20 16.5523 19.5523 17 19 17H10C9.44772 17 9 16.5523 9 16Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7.91774 8H5C4.44772 8 4 8.44772 4 9V21C4 21.5523 4.44772 22 5 22H14C14.5523 22 15 21.5523 15 21V17.9556"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="copy-lg-clip">
          {' '}
          <rect width="24" height="24" fill="none" />
        </clipPath>
      </defs>
    </svg>
  )
}

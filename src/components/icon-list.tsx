import { useTheme } from '@/context/ThemeContext'
import usePagination from '@/hooks/usePagination'
import { Icon } from '@/types/types'
import {
  copyToClipboard,
  downloadSVG,
  filterIconsByCategory,
  filterIconsBySearchTerm,
  getUniqueCategories,
  iconIssueBody,
  iconIssueSubject,
} from '@/utils/utils'
import { animate, stagger } from 'motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const IconList = ({ icons }: { icons: Icon[] }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [color, setColor] = useState<string>('#000000')
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [displayedIcons, setDisplayedIcons] = useState<Icon[]>(icons)
  const [selectedTerm, setSelectedTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const allCategories = useMemo(() => getUniqueCategories(icons), [icons])
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const activeDropdownRef = activeIcon
      ? dropdownRefs.current[activeIcon]
      : null

    if (activeDropdownRef && !activeDropdownRef.contains(target)) {
      setActiveIcon(null)
    }
  }

  useEffect(() => {
    let clickHandler: any

    if (!activeIcon) return

    // Delay adding the event listener to avoid immediate triggering after opening the dropdown
    const timer = setTimeout(() => {
      clickHandler = (e: MouseEvent) => closeDropdown(e)
      document.addEventListener('click', clickHandler)
    }, 100) // 100 milliseconds delay

    return () => {
      clearTimeout(timer) // Clear the timer if the component unmounts or before setting up a new one
      if (clickHandler) {
        document.removeEventListener('click', clickHandler)
      }
    }
  }, [activeIcon, closeDropdown])

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

  useEffect(() => {
    const allSvgs = document
      .querySelector('#icons-list')
      ?.querySelectorAll('svg')
    if (!allSvgs) return
    allSvgs.forEach((svg) => {
      svg.style.color = color
    })
  }, [color, displayedIcons, state])

  const searchTerm = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    setSelectedTerm((e.target as HTMLInputElement).value)
  }, [])

  return (
    <div className="list-shadow px-4 md:px-8 pt-12 pb-24 rounded-[40px] mb-24">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-16 ">
        <div className="flex flex-col gap-2">
          <input
            className={`${
              isDark ? 'text-black' : 'text-black'
            } ml-2 pl-2 h-[42px] rounded-md md:w-[460px] list-shadow-alt`}
            type="text"
            name="search"
            defaultValue={selectedTerm}
            onKeyUp={searchTerm}
            placeholder="Search Icon Here"
          />

          <div className="flex flex-col sm:flex-row my-4 gap-2 ml-2">
            <label htmlFor="color">
              <strong>NEW:</strong> try out with your color
            </label>
            <input
              id="color"
              name="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <span>{color}</span>
          </div>
        </div>

        <div className="flex items-center ml-2">
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

      <div className="flex flex-col text-center items-center justify-center gap-3 mb-6">
        <h2 className="text-3xl font-bold">Bee inspired by us</h2>
        <div className="text-xs text-center">
          Total number of icons: {icons.length}
        </div>
      </div>

      <ul
        id="icons-list"
        className={`flex flex-wrap items-start gap-8 md:gap-x-24 ${
          displayedIconsPaginated.length > 0 ? '' : 'md:items-center'
        } justify-center`}
      >
        {displayedIconsPaginated.length > 0 ? (
          displayedIconsPaginated.map((icon, index) => (
            <li
              key={index}
              className={`${
                activeIcon === icon.name ? 'z-[200]' : ''
              } flex flex-col items-center justify-center text-center gap-2 relative `}
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
                <div
                  ref={(el) => (dropdownRefs.current[icon.name] = el)}
                  className="dropdown-menu w-[150px] absolute top-0 left-1/2 -translate-x-1/2 lg:-right-48 lg:left-auto lg:-top-[20%] lg:translate-x-0 shadow-sm border border-solid border-black bg-white flex flex-col"
                >
                  <button
                    className="flex gap-2 items-center hover:bg-gray-200 py-2 px-2"
                    onClick={() => {
                      copyToClipboard(icon, 'lg')
                      setActiveIcon(null)

                      toast.success('Copied to clipboard!', {
                        icon: '📋',
                      })
                    }}
                  >
                    <IconCopy extraClasses="h-4 w-4" />
                    <span className="text-[10px] text-black">Copy</span>
                  </button>
                  <button
                    className="flex gap-2 items-center hover:bg-gray-200 py-2 px-2"
                    onClick={() => downloadSVG(icon, 'lg')}
                  >
                    <IconDownload extraClasses="h-4 w-4" />
                    <span className="text-[10px] text-black">Download</span>
                  </button>
                  <a
                    className="flex gap-2 items-center hover:bg-gray-200 py-2 px-2"
                    href={`mailto:manusansan22@gmail.com?subject=${iconIssueSubject}${icon.name}_id-${icon.id}&body=${iconIssueBody}`}
                  >
                    <IconIssue extraClasses="h-4 w-4" />
                    <span className="text-[10px] text-black">
                      Report an issue
                    </span>
                  </a>
                </div>
              )}
              <span
                onClick={() =>
                  setActiveIcon(activeIcon === icon.name ? null : icon.name)
                }
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.60rem] max-w-[65px] h-[20px] cursor-pointer font-medium`}
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
          <button
            onClick={actions.prevPage}
            disabled={isPrevDisabled}
            className="disabled:text-gray-300 disabled:pointer-events-none"
          >
            <svg
              className={`${
                isDark ? '!text-white' : ''
              } disabled:text-gray-300 disabled:pointer-events-none`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0673 19.1347L7.93266 12L15.0673 4.86534"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={state.currentPage == 1 ? 'font-bold' : ''}
            onClick={() => actions.jumpToPage(1)}
          >
            1
          </button>

          {state.currentPage > 2 && (
            <button onClick={actions.prevPage}>...</button>
          )}

          {state.currentPage > 1 &&
            state.currentPage <
              Math.ceil(displayedIcons.length / state.pageSize) && (
              <span className={'font-bold'}>{state.currentPage}</span>
            )}

          {state.currentPage <
            Math.ceil(displayedIcons.length / state.pageSize - 1) && (
            <button onClick={actions.nextPage}>...</button>
          )}

          {displayedIcons.length > state.pageSize && (
            <button
              className={
                state.currentPage ===
                Math.ceil(displayedIcons.length / state.pageSize)
                  ? 'font-bold'
                  : ''
              }
              onClick={() =>
                actions.jumpToPage(
                  Math.ceil(displayedIcons.length / state.pageSize)
                )
              }
            >
              {Math.ceil(displayedIcons.length / state.pageSize)}
            </button>
          )}

          <button
            onClick={actions.nextPage}
            disabled={isNextDisabled}
            className={`disabled:text-gray-300 disabled:pointer-events-none`}
          >
            <svg
              className={`${
                isDark ? '!text-white' : ''
              } disabled:text-gray-300 disabled:pointer-events-none`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.43268 4.86534L15.5673 12L8.43268 19.1347"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
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

const IconIssue = ({ extraClasses }: { extraClasses?: string }) => {
  return (
    <svg
      className={extraClasses}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#alert-circle-lg-clip)">
        <path
          d="M12.9951 17.1915C12.9951 16.6419 12.5496 16.1964 12 16.1964C11.4504 16.1964 11.0049 16.6419 11.0049 17.1915C11.0049 17.7411 11.4504 18.1866 12 18.1866C12.5496 18.1866 12.9951 17.7411 12.9951 17.1915Z"
          fill="currentColor"
        />
        <path
          d="M13 13.1964C13 13.7487 12.5523 14.1964 12 14.1964C11.4477 14.1964 11 13.7487 11 13.1964V7.19641C11 6.64413 11.4477 6.19641 12 6.19641C12.5523 6.19641 13 6.64413 13 7.19641V13.1964Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24.1866C18.6274 24.1866 24 18.814 24 12.1866C24 5.55917 18.6274 0.186584 12 0.186584C5.37258 0.186584 0 5.55917 0 12.1866C0 18.814 5.37258 24.1866 12 24.1866ZM12 22.1866C17.5228 22.1866 22 17.7094 22 12.1866C22 6.66374 17.5228 2.18658 12 2.18658C6.47715 2.18658 2 6.66374 2 12.1866C2 17.7094 6.47715 22.1866 12 22.1866Z"
          fill="currentColor"
        />
      </g>{' '}
      <defs>
        <clipPath id="alert-circle-lg-clip">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.186584)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

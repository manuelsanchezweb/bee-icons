import { Icon } from '@/types/types'

export const getUniqueCategories = (icons: Icon[]) => {
  const categories = icons.flatMap((icon) => icon.category)
  const uniqueCategories = [...new Set(categories)]

  const mostUsedCategoryIndex = uniqueCategories.indexOf('starred')

  if (mostUsedCategoryIndex !== -1) {
    uniqueCategories.splice(mostUsedCategoryIndex, 1)
    uniqueCategories.sort()
    uniqueCategories.unshift('starred')
  } else {
    uniqueCategories.sort()
  }

  return uniqueCategories
}

export const filterIconsByCategory = (icons: Icon[], category: string) => {
  if (category === 'all') {
    return icons
  }
  return icons.filter((icon) => icon.category.includes(category))
}

export function filterIconsBySearchTerm(icons: Icon[], term: string) {
  const searchTerm = term.toLowerCase().trim()

  const isInName = (icon: Icon) => icon.name.toLowerCase().includes(searchTerm)
  const isInCategory = (icon: Icon) =>
    icon.category.some((cat) => cat.toLowerCase().includes(searchTerm))
  const isInTags = (icon: Icon) =>
    icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))

  return icons.filter(
    (icon) => isInName(icon) || isInCategory(icon) || isInTags(icon)
  )
}

export const downloadSVG = (icon: Icon, size: 'lg') => {
  const svgContent = icon.icon[size]
  const blob = new Blob([svgContent], {
    type: 'image/svg+xml;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${icon.name}.svg`
  link.click()

  URL.revokeObjectURL(url)
}

export const copyToClipboard = (icon: Icon, size: 'lg') => {
  const svgContent = icon.icon[size]
  navigator.clipboard.writeText(svgContent)
}

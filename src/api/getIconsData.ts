import { Icon } from '@/types/types'

export async function getIconsData(): Promise<Icon[]> {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://www.bee-icons.com/api/get-icons-data'
      : 'http://localhost:3000/api/get-icons-data'

  const res = await fetch(url)
  const data = await res.json()
  const icons = data.icons

  return icons
}

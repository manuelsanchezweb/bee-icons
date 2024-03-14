import { Icon } from '@/types/types'

export async function getIconsData(): Promise<Icon[]> {
  const url = `${process.env.APP_URL}/api/icons`

  const res = await fetch(url)
  const data = await res.json()

  const sortedIcons = data.sort((a: Icon, b: Icon) =>
    a.name.localeCompare(b.name)
  )

  return sortedIcons as Icon[]
}

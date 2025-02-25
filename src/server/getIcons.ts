import { Icon } from '@/types/types'

export async function getIconsData(): Promise<Icon[]> {
  const url = `${process.env.APP_URL}api/icons`

  try {
    const data = await fetch(url).then((res) => res.json())

    const sortedIcons = data.sort((a: Icon, b: Icon) =>
      a.name.localeCompare(b.name)
    )

    return sortedIcons as Icon[]
  } catch (error) {
    console.error('error', error)
  }

  return []
}

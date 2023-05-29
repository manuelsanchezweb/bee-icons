import { Icon } from '@/types/types'

export async function getIconsData(): Promise<Icon[]> {
  const url = `${process.env.APP_URL}/api/icons`

  const res = await fetch(url)
  const data = await res.json()
  // console.log(data)

  return []
}

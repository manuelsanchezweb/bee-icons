import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Icon } from '@/types/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name?: string }> }
) {
  const jsonDirectory = path.join(process.cwd(), 'public/data')
  const fileContents = await fs.readFile(jsonDirectory + '/icons.json', 'utf8')
  const icons: Icon[] = JSON.parse(fileContents)

  const { name } = await params

  const icon = icons.find((icon: Icon) => icon.name === name)

  if (!icon) {
    return NextResponse.json(
      { error: 'Icon with that name was not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(icon, { status: 200 })
}

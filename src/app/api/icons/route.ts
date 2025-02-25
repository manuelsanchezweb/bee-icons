import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Icon } from '@/types/types'

export async function GET(request: Request) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'public/data')

  // Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/icons.json', 'utf8')

  // Parse JSON data into object
  const icons: Icon[] = JSON.parse(fileContents)
  // console.log('we are returning this', icons)

  // If name is not provided, return all icons
  return NextResponse.json(icons, { status: 200 })
}

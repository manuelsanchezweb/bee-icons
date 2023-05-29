import { Icon } from '@/types/types'
import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'data')

  // Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/icons.json', 'utf8')

  // Parse JSON data into object
  const iconsData = JSON.parse(fileContents)

  // Check if the 'name' query parameter exists
  const iconName = req.query.name

  if (iconName) {
    // If it exists, find the icon with the requested name
    const icon = iconsData.find((icon: Icon) => icon.name === iconName)

    if (!icon) {
      // If there is no such icon, return a 404 error
      res.status(404).json({ error: 'Icon not found' })
      return
    }

    // Return the requested icon
    res.status(200).json(icon)
  } else {
    // If no 'name' query parameter exists, return all icons
    res.status(200).json(iconsData as Icon[])
  }
}

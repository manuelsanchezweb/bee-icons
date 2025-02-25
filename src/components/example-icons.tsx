'use client'

import { Icon } from '@/types/types'
import { downloadSVG } from '@/utils/utils'

function ExampleIcons({ icons }: { icons: Icon[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {icons
        .sort((a, b) => b.id - a.id)
        .slice(0, 10)
        .map((icon: Icon) => (
          <button
            key={icon.name}
            onClick={() => downloadSVG(icon, 'lg')}
            className="hexa-shape hexa-shadow bg-gray-100 flex flex-col items-center justify-center min-w-[72px] w-[72px] min-h-[64px] transition-all hover:scale-110 focus:scale-110 focus:outline-none hover:bg-gray-300"
          >
            <div dangerouslySetInnerHTML={{ __html: icon.icon.lg }} />
          </button>
        ))}
    </div>
  )
}
export default ExampleIcons

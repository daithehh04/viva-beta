'use client'

import Aos from 'aos'
import { useEffect } from 'react'

export default function AosInit() {
  useEffect(() => {
    Aos.init({
      disable: function () {
        var maxWidth = 768
        return window.innerWidth < maxWidth
      }
    })
    Aos.refresh()
  }, [])

  return <></>
}

import React from 'react'

export default function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleResize = () => setIsMobile(mediaQuery.matches)
    handleResize()
    mediaQuery.addListener(handleResize)
    return () => mediaQuery.removeListener(handleResize)
  }, [])

  return isMobile
}

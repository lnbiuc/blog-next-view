export function addHoverEffect(select: string, offset: number) {
  const card: HTMLElement | null = document.querySelector(select)
  const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)')
  const THRESHOLD = offset

  function handleHover(e: any) {
    if (!card)
      return
    const { clientX, clientY, currentTarget } = e
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget

    const horizontal = (clientX - offsetLeft) / clientWidth
    const vertical = (clientY - offsetTop) / clientHeight
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2)
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2)

    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`
  }

  function resetStyles(e: any) {
    if (!card)
      return
    card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`
  }

  if (!motionMatchMedia.matches) {
    if (!card)
      return
    card.addEventListener('mousemove', handleHover)
    card.addEventListener('mouseleave', resetStyles)
  }
}

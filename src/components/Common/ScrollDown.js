'use client'

const ScrollDown = ({block}) => {
  return (
    <div className='h-full w-full absolute top-0 left-0 z-10' onClick={() => {
      document.getElementById(block).scrollIntoView({ behavior: 'smooth' });
    }}></div>
  )
}

export default ScrollDown
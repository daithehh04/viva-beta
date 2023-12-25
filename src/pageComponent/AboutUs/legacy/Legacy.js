
function Legacy({dataLegacy}) {
  return (
    <div className='md:mt-[6.56vw] mt-[4.2vw] w-full md:px-[16.25vw] px-[4.27vw] md:mb-[7vw] mb-[15.47vw] md:text-[1.75vw] legacy' dangerouslySetInnerHTML={{ __html: `${dataLegacy}` }}>
    </div>
  )
}

export default Legacy
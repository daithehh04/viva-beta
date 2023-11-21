"use client"
import { Navigation as NavigationModule, Pagination as PaginationModule } from "swiper/modules"
import { Swiper, SwiperSlide as SwiperSlideLib } from "swiper/react"

const SwiperSlide = SwiperSlideLib
const Navigation = NavigationModule
const Pagination = PaginationModule

const Swipper = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Swiper
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Swipper.displayName = "Swiper"

export { Swipper, SwiperSlide, Navigation, Pagination }
import { useRef, useEffect } from '@wordpress/element';
import { useSlides } from './useSlides';
import { Slide } from './Slide';
import { ArrowsAndIndicators } from './ArrowsAndIndicators';

// TODO: Move these two into Slide?
import { SlideBackground } from './SlideBackground';
import { StaticCaption } from './StaticCaption';

const { __ } = wp.i18n;

export const CarouselHeaderFrontend = ({ slides, carousel_autoplay }) => {
  const slidesRef = useRef([]);
  const containerRef = useRef(null);
  const {
    currentSlide,
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    setCarouselHeight,
    autoplayPaused,
    autoplayCancelled
  } = useSlides(slidesRef, slides.length - 1, containerRef);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const carouselElement = containerRef.current;
    const carouselHeadHammer = new Hammer(carouselElement, { recognizers: [] });
    const hammer = new Hammer.Manager(carouselHeadHammer.element);
    const swipe = new Hammer.Swipe();
    // Only allow horizontal swiping (not vertical swiping)
    swipe.set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.add(swipe);

    const swipeListeners = [
      goToNextSlide,
      goToPrevSlide
    ];

    const isRTL = document.querySelector('html').dir === 'rtl';
    if (isRTL) {
      swipeListeners.reverse();
    }

    hammer.on('swipeleft', swipeListeners[0]);
    hammer.on('swiperight', swipeListeners[1]);

    return () => {
      hammer.off('swipeleft', swipeListeners[0]);
      hammer.off('swiperight', swipeListeners[1]);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const currentSlideRef = slidesRef.current[currentSlide];
    if (currentSlideRef) {
      setCarouselHeight(currentSlideRef);

      window.addEventListener('resize', () => setCarouselHeight(currentSlideRef));
    }

    return () => window.removeEventListener('resize', () => setCarouselHeight(currentSlideRef));
  }, []);

  // Set up the autoplay for the slides
  const timerRef = useRef(null);
  useEffect(() => {
    if (carousel_autoplay && slides.length > 1 && !autoplayPaused && !autoplayCancelled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => goToNextSlide(true), 10000);
      return () => clearTimeout(timerRef.current);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [currentSlide, slides, carousel_autoplay, autoplayPaused, autoplayCancelled]);

  return (
    <section
      className='block block-header block-wide carousel-header-beta'
      ref={containerRef}
    >
      <div className='carousel-wrapper-header'>
        <div className='carousel-inner' role='listbox'>
          {slides.map((slide, index) => (
            <Slide
              key={index}
              active={currentSlide == index}
              ref={element => slidesRef ? slidesRef.current[index] = element : null}
            >
              <SlideBackground slide={slide} />
              <StaticCaption slide={slide} />
            </Slide>
          ))}
          <ArrowsAndIndicators
            goToPrevSlide={goToPrevSlide}
            goToNextSlide={goToNextSlide}
            goToSlide={goToSlide}
            slides={slides}
            currentSlide={currentSlide}
          />
        </div>
      </div>
    </section>
  );
}

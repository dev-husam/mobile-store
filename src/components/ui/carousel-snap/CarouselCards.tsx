import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

import CarouselCardItem, {SLIDER_WIDTH} from './CarouselCardItem';

const CarouselCards = ({data}) => {
  const isCarousel = React.useRef(null);

  return (
    <Carousel
      ref={isCarousel}
      data={data}
      scrollAnimationDuration={2000}
      renderItem={CarouselCardItem}
      width={SLIDER_WIDTH}
      height={200}
      autoPlay={true}
    />
  );
};

export default CarouselCards;

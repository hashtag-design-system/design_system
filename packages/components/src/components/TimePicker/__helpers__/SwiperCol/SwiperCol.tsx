import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useClassnames, useIsMobile } from "../../../../utils/hooks";
import Input from "../../../Input";

export type TimePickerSwiperColProps = {
  min?: number;
  max?: number;
  step?: number;
  padMaxLength?: number;
};

export type TimePickerSwiperColFProps = TimePickerSwiperColProps & Swiper;

export const SwiperCol: React.FC<TimePickerSwiperColFProps> = ({
  min = 0,
  max = 60,
  step = 1,
  initialSlide = min,
  padMaxLength = 2,
  style,
  onSlideChange,
  ...props
}) => {
  const [value, setValue] = useState(initialSlide);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [classNames, rest] = useClassnames("time-picker", props);
  const { isMobile } = useIsMobile();

  const { height = isMobile ? 300 : 160 } = rest;

  const handleFocus = (bool: boolean) => {
    setIsInputFocused(bool);
    if (swiper) {
      swiper.allowTouchMove = !bool;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, valueAsNumber } = e.target;
    if (swiper) {
      if (valueAsNumber === 0 || value.trim().length === 0 || valueAsNumber > max || valueAsNumber < min) {
        swiper.slideToLoop(0);
      } else if (valueAsNumber) {
        swiper.slideToLoop(valueAsNumber);
      }
    }
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setValue(swiper.realIndex);

    if (onSlideChange) {
      onSlideChange(swiper);
    }
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideToLoop(Math.floor(Math.random() * (max - min + 1)) + min);
      setTimeout(() => {
        swiper.slideToLoop(initialSlide, 750);
      }, 750);
    }
  }, [min, max, initialSlide, swiper]);

  return (
    <div style={{ position: "relative", width: "max-content" }}>
      <div className="time-picker__item-container">
        <Input.Number
          min={min}
          max={max}
          step={step}
          showBtnControl={false}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          onChange={e => handleChange(e)}
          className="time-picker__item__input"
          style={{ opacity: isInputFocused ? 1 : 0 }}
        />
      </div>
      <Swiper
        className={classNames}
        slidesPerView={3}
        centeredSlides
        grabCursor
        initialSlide={initialSlide}
        slideToClickedSlide
        freeMode
        height={height}
        freeModeSticky
        freeModeMomentumRatio={0.75}
        freeModeMomentumVelocityRatio={0.75}
        direction="vertical"
        loop
        loopAdditionalSlides={max / 2}
        preloadImages={false}
        resistanceRatio={0.25}
        style={{ "--height": height + "px", ...style } as any}
        onSwiper={swipper => setSwiper(swipper)}
        onSlideChange={swiper => handleSlideChange(swiper)}
        {...rest}
      >
        {range(min, max, step).map(itemNum => (
          <SwiperSlide
            key={itemNum}
            onClick={e => {
              if (e.currentTarget.textContent?.includes(value.toString())) {
                e.preventDefault();
              }

              // setIsInputFocused(false)
              // console.log(document.activeElement);
            }}
            className="time-picker__item"
          >
            {itemNum.toString().padStart(padMaxLength, "0")}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

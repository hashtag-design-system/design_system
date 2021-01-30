import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useClassnames, useIsMobile } from "../../../../utils/hooks";
import Input, { InputNumberFProps } from "../../../Input";

export type TimePickerSwiperColProps = {
  min?: number;
  max?: number;
  step?: number;
  padMaxLength?: number;
  inputProps?: Omit<InputNumberFProps, "max" | "min" | "step" | "showBtnControl">;
};

export type TimePickerSwiperColFProps = TimePickerSwiperColProps & Swiper;

export const SwiperCol: React.FC<TimePickerSwiperColFProps> = ({
  min = 0,
  max = 60,
  step = 1,
  initialSlide = min,
  padMaxLength = 2,
  style,
  inputProps = {},
  ...props
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [classNames, restProps] = useClassnames("time-picker", props);
  const [inputClassNames, inputRestProps] = useClassnames("time-picker__input", inputProps);
  const { isMobile } = useIsMobile();

  /* istanbul ignore next */
  const { height = isMobile ? 240 : 160, ...rest } = restProps;
  const { onFocus: inputOnFocus, onBlur: inputOnBlur, onChange: inputOnChange, style: inputStyle, ...inputRest } = inputRestProps;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, bool: boolean, eventType: "focus" | "blur") => {
    setIsInputFocused(bool);
    if (eventType === "focus" && swiper) {
      swiper.slideToLoop(e.target.valueAsNumber);
    }

    if (eventType === "focus") {
      if (inputOnFocus) {
        inputOnFocus(e);
      }
    } else {
      /* istanbul ignore next */
      if (inputOnBlur) {
        inputOnBlur(e);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, valueAsNumber } = e.target;
    /* istanbul ignore next */
    if (swiper) {
      if (valueAsNumber === 0 || value.trim().length === 0 || valueAsNumber > max || valueAsNumber < min) {
        swiper.slideToLoop(0);
      } else if (valueAsNumber) {
        swiper.slideToLoop(valueAsNumber);
      }
    }

    if (inputOnChange) {
      inputOnChange(e);
    }
  };

  useEffect(() => {
    if (swiper && isMobile) {
      swiper.slideToLoop(Math.floor(Math.random() * (max - min + 1)) + min);
      setTimeout(() => {
        /* istanbul ignore next */
        swiper.slideToLoop(initialSlide, 750);
      }, 750);
    }
  }, [min, max, initialSlide, isMobile, swiper]);

  return (
    <div style={{ position: "relative", width: "max-content" }}>
      <div className="time-picker__item-container" data-testid="time-picker-item-container">
        <Input.Number
          min={min}
          max={max}
          step={step}
          showBtnControl={false}
          onFocus={e => handleFocus(e, true, "focus")}
          onBlur={e => handleFocus(e, false, "blur")}
          onChange={e => handleChange(e)}
          className={inputClassNames}
          style={{ ...inputStyle, opacity: isInputFocused ? 1 : 0 }}
          {...inputRest}
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
        data-testid="time-picker"
        {...rest}
      >
        {range(min, max, step).map((itemNum, i) => (
          <SwiperSlide
            key={itemNum}
            onClick={() => swiper && swiper.slideToLoop(i)}
            className="time-picker__item"
            data-testid="time-picker-item"
          >
            {itemNum.toString().padStart(padMaxLength, "0")}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

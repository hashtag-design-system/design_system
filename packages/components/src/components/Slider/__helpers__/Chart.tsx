import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculatePercentage } from "../../../utils";
import { useSliderContext } from "../../../utils/contexts/SliderContext";
import { useWindowDimensions } from "../../../utils/hooks";
import { SliderChartDataProp } from "../Slider";

type Props = {
  value: number | object;
};

type FProps = Props & Pick<React.ComponentPropsWithoutRef<"div">, "style">;

export const Chart: React.FunctionComponent<FProps> = ({ value, style }) => {
  const [chartOverlayLeft, setChartOverlayLeft] = useState<number>(0);
  const windowDimensions = useWindowDimensions();

  const chartOverlay = useRef<HTMLDivElement>(null);
  const chartOverlayFrameRef = useRef<HTMLDivElement>(null);
  const chartFrameRef = useRef<HTMLDivElement>(null);

  const { chart } = useSliderContext();

  const calcBarHeight = useCallback(
    (data: SliderChartDataProp) => {
      if (!chart) {
        return undefined;
      }
      const { percentage } = chart;
      const { value } = data;
      if (percentage) {
        return value;
      } else {
        const data = chart.data.map(datum => datum.value);
        const maxVal = Math.max(...data);
        const perc = calculatePercentage(value, 0, maxVal, { returnRounded: true });
        return perc;
      }
    },
    [chart]
  );

  useEffect(() => {
    if (chartOverlay && chartOverlay.current) {
      setChartOverlayLeft(chartOverlay.current.offsetLeft);
    }
  }, [chartOverlay, value]);

  useEffect(() => {
    if (chartFrameRef && chartFrameRef.current && chartOverlayFrameRef && chartOverlayFrameRef.current) {
      chartOverlayFrameRef.current.style.width = `${chartFrameRef.current.offsetWidth}px`;
    }
  }, [windowDimensions.width, chartFrameRef, chartOverlayFrameRef]);

  return chart ? (
    <div className="slider__chart flex-column-flex-start-flex-start">
      <div className="slider__chart__overlay" style={style} ref={chartOverlay}>
        <div
          className="slider__chart__frame slider__chart__frame__overlay"
          ref={chartOverlayFrameRef}
          style={{ left: `-${chartOverlayLeft}px` }}
        >
          {chart.data.map((datum, i) => {
            return <div key={i} className="slider__chart__bar" style={{ height: `${calcBarHeight(datum)}%` }}></div>;
          })}
        </div>
      </div>
      <div className="slider__chart__frame" ref={chartFrameRef}>
        {chart.data.map((datum, i) => {
          return <div key={i} className="slider__chart__bar" style={{ height: `${calcBarHeight(datum)}%` }}></div>;
        })}
      </div>
    </div>
  ) : null;
};

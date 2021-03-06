import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculatePercentage, useWindowDimensions } from "../../../../utils";
import { useSliderContext } from "../../../../utils";
import { SliderChartDataProp } from "../../Slider";
import { Bar } from "./Bar";

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
    <div className="slider__chart flex-column-flex-start-flex-start" data-testid="slider-chart-container">
      <div className="slider__chart__overlay" data-testid="slider-chart-overlay-container" style={style} ref={chartOverlay}>
        <div
          className="slider__chart__frame slider__chart__frame__overlay"
          ref={chartOverlayFrameRef}
          style={{ left: `-${chartOverlayLeft}px` }}
          data-testid="slider-chart-overlay"
        >
          {chart.data.map((datum, i) => {
            return <Bar key={i} height={calcBarHeight(datum)} />;
          })}
        </div>
      </div>
      <div className="slider__chart__frame" ref={chartFrameRef} data-testid="slider-chart">
        {chart.data.map((datum, i) => {
          return <Bar key={i} height={calcBarHeight(datum)} />;
        })}
      </div>
    </div>
  ) : null;
};

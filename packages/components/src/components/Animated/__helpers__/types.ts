export type CSSProperties = React.CSSProperties;

export type AnimationType = {
  duration?: CSSProperties["animationDuration"];
  timing?: CSSProperties["animationTimingFunction"];
  iteration?: CSSProperties["animationIterationCount"];
};

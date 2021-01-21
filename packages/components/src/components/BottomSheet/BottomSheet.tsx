import { DraggableProps, PanInfo, useAnimation, useMotionValue, Variant } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useClassnames, useWindowDimensions } from "../../utils/hooks";
import Dialog, { DialogDismissInfoType, DialogFProps } from "../Dialog";
import { ComponentState, overlayVariants } from "../__helpers__";
import ScrollBar from "./ScrollBar";

// See: https://github.com/framer/snippets/blob/master/animation/Re-rendering%20when%20a%20MotionValue%20changes.md
// See: https://www.youtube.com/watch?v=ogwnFACfW1Q

export type BottomSheetAllowNextObj = { whenMiddle: number; whenExpanded: number };
export const BottomSheetPositions = ["hidden", "middle", "expanded"] as const;
export type BottomSheetPosition = typeof BottomSheetPositions[number];
type DialogVariantsCustom = { height: number; defaultY: number };
type DragEvent = MouseEvent | TouchEvent | PointerEvent;
type BottomSheetVariablePositions = Exclude<BottomSheetPosition, "hidden">;

const dialogVariants: Record<BottomSheetPosition, Variant> = {
  hidden: ({ height }: DialogVariantsCustom) => ({ y: height, transition: { ease: "easeIn" } }),
  middle: ({ defaultY }: DialogVariantsCustom) => ({ y: defaultY }),
  expanded: { y: 0 },
};

export type Props = {
  defaultY?: number;
  allowNext?: number | BottomSheetAllowNextObj;
  allowedPositions?: { [k in BottomSheetVariablePositions]: boolean };
  onChange?: (y: number, info: { position: BottomSheetPosition; dragConstraints: DraggableProps["dragConstraints"] }) => void;
  onDismiss?: (info: DialogDismissInfoType, e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
  children?: React.ReactNode | ((utils: { dismiss: () => Promise<void> }) => React.ReactNode);
};

export type FProps = Props & Omit<DialogFProps, "onChange" | "onDismiss"> & ComponentState<BottomSheetVariablePositions>;

type SubComponents = {
  ScrollBar: typeof ScrollBar;
};

const BottomSheet: React.FC<FProps> & SubComponents = ({
  defaultY = 400,
  allowNext = { whenMiddle: 75, whenExpanded: 50 },
  allowedPositions = { expanded: true, middle: true },
  state = "middle",
  isShown,
  dragElastic = 0.3,
  variants,
  style,
  transition,
  custom,
  overlayProps,
  children,
  onChange,
  onDrag,
  onDragEnd,
  onDismiss,
  onAnimationComplete,
  ...props
}) => {
  const [position, setPosition] = useState<BottomSheetPosition>(state);
  const y = useMotionValue(position === "expanded" ? 0 : defaultY);
  const [yState, setYState] = useState(y.get());
  const [animationEnd, setAnimationEnd] = useState<boolean>(false);
  const [classNames, rest] = useClassnames("bottom-sheet", props);
  const modalRef = useRef<HTMLDivElement>(null);
  const dialogControls = useAnimation();
  const overlayControls = useAnimation();
  const { height } = useWindowDimensions();

  const dragConstraints = useMemo((): DraggableProps["dragConstraints"] => {
    switch (position) {
      case "middle": {
        return {
          top: defaultY,
          bottom: defaultY,
        };
      }
      case "expanded": {
        return {
          top: 0,
          bottom: 0,
        };
      }
      case "hidden": {
        return { top: 0, bottom: height };
      }
    }
  }, [defaultY, height, position]);

  const fAllowNext = useMemo((): BottomSheetAllowNextObj => {
    if (typeof allowNext === "number") {
      return {
        whenMiddle: allowNext,
        whenExpanded: allowNext,
      };
    } else {
      return allowNext;
    }
  }, [allowNext]);

  const goTo = (position: BottomSheetVariablePositions) => {
    if (allowedPositions[position]) {
      dialogControls.start(dialogVariants[position]);
      setPosition(position);
    }
  };

  const dismiss = async (info: DialogDismissInfoType) => {
    setPosition("hidden");
    const cancel = info.cancel;
    if (cancel === true) {
      await dialogControls.start(dialogVariants.hidden);
    }
    await overlayControls.start(overlayVariants.hidden, { delay: cancel ? 0 : 0.1 });
  };

  const handleAnimationComplete = () => {
    setAnimationEnd(true);

    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const handleDrag = async (e: DragEvent, info: PanInfo) => {
    if (info.velocity.y >= (position === "middle" ? 350 : 1000) && info.delta.y >= 50) {
      await handleDismiss({ cancel: false }, e as any);
    }

    if (onDrag) {
      onDrag(e, info);
    }
  };

  const handleDragEnd = (e: DragEvent, info: PanInfo) => {
    if (position === "hidden") {
      return;
    }
    if (Math.abs(info.velocity.y) >= 175) {
      if (position === "expanded") {
        goTo("middle");
      } else if (position === "middle" && info.velocity.y <= 0) {
        goTo("expanded");
      }
    } else if (position === "expanded" && yState >= fAllowNext.whenExpanded) {
      // ! Not this -> dialogControls.start(dialogVariants.middle).then(() => setPosition("middle"));
      // It lags and makes is totally bad UX. That is why the following is preffered
      // Neither "await dialogControls.start(dialogVariants.middle)" will work correctly.
      // But the following seems to work just as needed
      goTo("middle");
    } else if (yState <= defaultY - fAllowNext.whenMiddle) {
      goTo("expanded");
    }

    if (onDragEnd) {
      onDragEnd(e, info);
    }
  };

  const handleDismiss = async (info: DialogDismissInfoType, e?: React.MouseEvent<HTMLElement>) => {
    await dismiss(info);

    if (onDismiss) {
      onDismiss(info, e);
    }
  };

  useEffect(() => {
    const unsubscribe = y.onChange(setYState);
    return unsubscribe;
  }, [y]);

  useEffect(() => {
    async function promiseFunction() {
      if (isShown === true) {
        await dialogControls.start(dialogVariants.hidden);
        overlayControls.start("visible");
        dialogControls.start(dialogVariants[position]);
        setPosition(position);
      }
    }
    promiseFunction();
    // eslint-disable-next-line
  }, [isShown]);

  useEffect(() => {
    if (onChange) {
      onChange(yState, { position, dragConstraints });
    }
  }, [yState, position, dragConstraints, onChange]);

  return (
    <Dialog
      isShown={isShown}
      className={classNames}
      drag={animationEnd && "y"}
      draggable
      dragDirectionLock
      variants={animationEnd ? variants : { ...dialogVariants, ...variants }}
      transition={{ duration: 0.3, ease: "easeInOut", ...transition }}
      animate={dialogControls}
      custom={{ defaultY, height, ...custom } as DialogVariantsCustom}
      dragElastic={yState <= 0 ? 0.06 : dragElastic}
      onDrag={async (e, info) => await handleDrag(e, info)}
      onDragEnd={(e, info) => handleDragEnd(e, info)}
      onDismiss={async (e, info) => await handleDismiss(info, e)}
      dragConstraints={dragConstraints}
      overlayProps={{ ref: modalRef, animate: overlayControls, background: { alpha: 0.4 }, ...overlayProps }}
      onAnimationComplete={() => handleAnimationComplete()}
      style={{ ...style, y, borderRadius: yState <= 5 ? 0 : undefined }}
      {...rest}
    >
      {/* @ts-expect-error */}
      {children({ dismiss: () => handleDismiss({ cancel: true }) })}
      <div style={{ padding: "1.25em" }}>
        <p>
          <b>{position}</b>
        </p>
        <br />
        <p>
          <b>{JSON.stringify(allowNext)}</b>
        </p>
        <p>
          <b>{JSON.stringify(dragConstraints)}</b>
        </p>
        <br />
        <p>
          <b>{yState}</b>
        </p>
      </div>
    </Dialog>
  );
};

BottomSheet.ScrollBar = ScrollBar;

export default BottomSheet;

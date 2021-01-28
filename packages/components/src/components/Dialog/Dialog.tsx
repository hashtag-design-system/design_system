import { HTMLMotionProps, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { DialogContextProvider } from "../../utils/contexts";
import { useClassnames, useClickOutside, useIsMobile } from "../../utils/hooks";
import { ButtonFProps } from "../Button";
import { ComponentLoading, Modal, ModalOverlayFProps } from "../__helpers__";
import Btn from "./Btn/Btn";
import Content from "./Content";
import Title from "./Title";

const scaleVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
};

export type DialogDismissInfoType = { cancel: boolean };
export type DialogChildrenInfo = { childrenHeight: number; width: number };

export type Props = {
  confirm?: boolean;
  allowDismissOnLoading?: boolean;
  overlayProps?: Partial<ModalOverlayFProps>;
  children?: React.ReactNode | ((info: DialogChildrenInfo) => React.ReactNode);
  onDismiss?: (e: React.MouseEvent<HTMLElement>, info: DialogDismissInfoType) => void;
  onChildrenHeight?: (height: number) => void;
  onWidth?: (width: number) => void;
};

export type FProps = Props & Pick<ModalOverlayFProps, "isShown"> & ComponentLoading & HTMLMotionProps<"div">;

type SubComponents = {
  Btn: typeof Btn;
  Title: typeof Title;
  Content: typeof Content;
};

const Dialog: React.FC<FProps> & SubComponents = ({
  isShown,
  confirm = false,
  loading,
  allowDismissOnLoading = true,
  overlayProps,
  style,
  children,
  onDismiss,
  onWidth,
  onChildrenHeight,
  ...props
}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const { ref: modalRef, setIsOpen } = useClickOutside<HTMLDivElement>(
    isShown,
    undefined,
    e => onDismiss && onDismiss(e, { cancel: true })
  );
  const [classNames, rest] = useClassnames("dialog", props);
  const { isMobile } = useIsMobile();

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>, info: { cancel: boolean }, onClick?: ButtonFProps["onClick"]) => {
    if (onClick) {
      onClick(e);
    }

    if (onDismiss) {
      onDismiss(e, { cancel: info.cancel });
    }
  };

  const hasBtnGroup =
    children &&
    (React.Children.toArray(children) as React.ReactElement[]).filter(
      // @ts-expect-error
      child => child && child.type && child.type.displayName === Btn.Group.displayName
    ).length >= 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (onDismiss && e.code === "Escape") {
        onDismiss(e as any, { cancel: true });
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    setIsOpen(isShown);
  }, [isShown, setIsOpen, modalRef]);

  useEffect(() => {
    if (modalRef && modalRef.current) {
      const newChildrenHeight = Array.from(modalRef.current.children).reduce((total, child) => total + child.clientHeight, 0);
      const newWidth = modalRef.current!.offsetWidth;
      setHeight(newChildrenHeight);
      setWidth(newWidth);

      if (onChildrenHeight) {
        onChildrenHeight(newChildrenHeight);
      }
      if (onWidth) {
        onWidth(newWidth);
      }
    }
  }, [modalRef, onChildrenHeight, onWidth]);

  useEffect(() => {
    document.addEventListener("keydown", e => handleKeyDown(e));

    return () => {
      document.removeEventListener("keydown", e => handleKeyDown(e));
    };
  }, [handleKeyDown]);

  return (
    <DialogContextProvider value={{ confirm, loading, allowDismissOnLoading, hasBtnGroup: hasBtnGroup || false, handleDismiss }}>
      <Modal.Overlay isShown={isShown} {...overlayProps}>
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2 }}
          className={classNames}
          ref={modalRef}
          style={{ translateY: !isMobile ? "-50%" : undefined, ...style }}
          data-testid="dialog"
          {...rest}
        >
          {/* @ts-expect-error */}
          {children && (typeof children === "function" ? children({ childrenHeight: height, width } as DialogChildrenInfo) : children)}
        </motion.div>
      </Modal.Overlay>
    </DialogContextProvider>
  );
};

Dialog.Btn = Btn;
Dialog.Title = Title;
Dialog.Content = Content;

export default Dialog;

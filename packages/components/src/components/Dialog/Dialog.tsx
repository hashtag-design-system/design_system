import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { DialogContextProvider } from "../../utils/contexts";
import { useClassnames, useClickOutside } from "../../utils/hooks";
import { ButtonFProps } from "../Button";
import { Modal, ModalOverlayFProps } from "../__helpers__";
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

export type Props = {
  confirm?: boolean;
  onDismiss?: (e: React.MouseEvent<HTMLElement>) => void;
};

export type FProps = Props & ModalOverlayFProps;

type SubComponents = {
  Btn: typeof Btn;
  Title: typeof Title;
  Content: typeof Content;
};

const Dialog: React.FC<FProps> & SubComponents = ({ isShown, confirm = false, onDismiss, children, ...props }) => {
  const { ref: modalRef, setIsOpen } = useClickOutside<HTMLDivElement>(isShown, undefined, onDismiss);
  const [classNames, rest] = useClassnames("dialog", props);

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>, onClick?: ButtonFProps["onClick"]) => {
    if (onDismiss) {
      onDismiss(e);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const hasBtnGroup =
    children &&
    (React.Children.toArray(children) as React.ReactElement[]).filter(
      // @ts-expect-error
      child => child && child.type && child.type.displayName === Btn.Group.displayName
    ).length >= 1;

  useEffect(() => {
    setIsOpen(isShown);
  }, [isShown, setIsOpen]);

  return (
    <DialogContextProvider value={{ confirm, hasBtnGroup: hasBtnGroup || false, handleDismiss }}>
      <Modal.Overlay isShown={isShown}>
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.1 }}
          className={classNames}
          ref={modalRef}
          data-testid="dialog"
          {...rest}
        >
          {children}
        </motion.div>
      </Modal.Overlay>
    </DialogContextProvider>
  );
};

Dialog.displayName = "Dialog";
Dialog.Btn = Btn;
Dialog.Title = Title;
Dialog.Content = Content;

export default Dialog;

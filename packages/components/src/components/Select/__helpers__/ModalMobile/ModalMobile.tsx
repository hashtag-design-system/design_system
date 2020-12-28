import React from "react";
import { useSelectContext } from "../../../../utils/contexts";
import { Modal } from "../../../__helpers__";

const modalOpacityVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export type Props = {};

export const ModalMobile: React.FC = ({ children }) => {
  const { isOpen, isMobile } = useSelectContext();

  return isMobile ? (
    <Modal.Overlay
      isShown={isOpen}
      bgColor="dark"
      className="select__modal--mobile"
      variants={modalOpacityVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25, when: "beforeChildren" }}
    >
      {children}
    </Modal.Overlay>
  ) : (
    <>{children}</>
  );
};

// {/* <Modal.Overlay isShown={isOpen} bgColor="dark"> */}
// {children}
// {/* <Select.Modal>
//   <Select.Header>Hey</Select.Header>
//   <Select.Item id="hey">Hey</Select.Item>
//   <Select.Item id="amsterdam">Amsterdam</Select.Item>
//   <Select.Item id="georgekrax">georgekrax</Select.Item>
//   <Select.Item id="hello1">hello</Select.Item>
//   <Select.Item id="hello2">hello</Select.Item>
//   <Select.Item id="hello3">hello</Select.Item>
//   <Select.Item id="hello4">hello</Select.Item>
//   <Select.Item id="hello5">dzfdfqfferfer</Select.Item>
//   <Select.Item id="hello6">hellrefrferfeo</Select.Item>
//   <Select.Item id="hello7">hello</Select.Item>
//   <Select.Item id="hello8">helrfrfewrlo</Select.Item>
//   <Select.Item id="hello9">wfwfwerf</Select.Item>
// </Select.Modal> */}
// {/* // </Modal.Overlay> */}
// {/* // ) : (
// //   <>{children}</>
// // ); */}

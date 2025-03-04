"use client";

import React, {
  createContext,
  useContext,
  useState,
  cloneElement,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import classNames from "classnames/bind";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

// Types
interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

interface ModalProps {
  children: React.ReactNode;
}

interface OpenProps {
  children: React.ReactElement;
  opens: string;
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
}

// Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
};

// Portal Component
const ClientPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};

// Components
export const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FC<OpenProps> = ({ children, opens: opensWindowName }) => {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
};

const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useModal();
  // Use the hook with the correct signature - it returns a ref
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  const modalContent = (
    <div className={cx("modal")}>
      <div className={cx("modal__overlay")} />
      <div className={cx("modal__content")} ref={ref}>
        <button
          className={cx("modal__close")}
          onClick={close}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className={cx("modal__body")}>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>
  );

  return <ClientPortal>{modalContent}</ClientPortal>;
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

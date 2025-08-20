import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "5px", minWidth: "300px", position: "relative" }}>
        <h3>{title}</h3>
        <button style={{ position: "absolute", top: 10, right: 10 }} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

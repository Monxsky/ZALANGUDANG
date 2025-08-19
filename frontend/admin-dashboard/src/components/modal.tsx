// src/components/Modal.tsx
import React from "react";
import { SKU } from "../services/skuService";
import type {Transaction as TxType } from "../services/transactionService"
interface Props {
  onClose: () => void;
  children?: React.ReactNode;
  onSave?: (data: any) => void
  sku?: SKU | null;
  transaction?: TxType | null;
}

const Modal: React.FC<Props> = ({ onClose, children, onSave, sku }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "400px",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

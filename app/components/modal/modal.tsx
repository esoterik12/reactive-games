"use client";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleModal } from "@/app/redux/modalSlice";

interface ModalState {
  showModal: boolean;
  message: string;
}

const Modal = () => {
  const dispatch = useDispatch();
  const { showModal, message } = useSelector(
    (state: any) => state.modal
  ) as ModalState;

  console.log("Modal: ", showModal, message)

  useEffect(() => {    
    let timer: NodeJS.Timeout | number;
    if (showModal) {
      timer = setTimeout(() => dispatch(toggleModal()), 3000);
    } 
    
    return () => clearTimeout(timer); 
  }, [showModal, dispatch]); 

  if (!showModal) return null;

  return createPortal(
    <div>
      <p>{message}</p>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;

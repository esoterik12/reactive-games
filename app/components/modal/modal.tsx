"use client";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleModal } from "@/app/redux/modalSlice";
import classes from './Modal.module.css'

interface ModalState {
  showModal: boolean;
  message: string;
}

const Modal = () => {
  const dispatch = useDispatch();

  const { showModal, message } = useSelector(
    (state: any) => state.modal
  ) as ModalState;

  useEffect(() => {    
    let timer: NodeJS.Timeout | number;
    if (showModal) {
      timer = setTimeout(() => dispatch(toggleModal()), 3000);
    } 
    
    return () => clearTimeout(timer); 
  }, [showModal, dispatch]); 

  if (!showModal) return null;

  return createPortal(
    <div className={classes.modal}>
      <p>{message}</p>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;

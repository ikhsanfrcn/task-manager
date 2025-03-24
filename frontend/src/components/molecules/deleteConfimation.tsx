"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../atoms/button";

interface DeleteConfirmationProps {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({ isOpen, closeModal, onConfirm }: DeleteConfirmationProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold">Delete Confirmation</Dialog.Title>
            <p className="mt-2">Are you sure you want to delete this data?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={closeModal} className="px-4 py-2 border rounded-md">Cancel</Button>
              <Button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

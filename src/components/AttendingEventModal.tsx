import React from "react";
import { AttendingEventModalType } from "@/types/attendees";

const AttendingEventModal = ({
  modalOpen,
  setModalOpen,
  attendingEvent,
  processing,
}: AttendingEventModalType) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/50 justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-scale-up">
        <button onClick={() => setModalOpen(false)}>close modal</button>
        <h2>Please confirm attendance</h2>

        <div className="flex gap-x-7 mt-8">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-red-500 px-3 py-1 text-white font-bold capitalize rounded-md"
          >
            cancel
          </button>
          <button
            onClick={attendingEvent}
            disabled={processing}
            className="bg-green-500 px-3 py-1 text-white font-bold capitalize rounded-md"
          >
            {processing ? "Processing" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendingEventModal;

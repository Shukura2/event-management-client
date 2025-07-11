"use client";
import React, { useState } from "react";
import { sendFeedbackFormToAttendee } from "@/app/action";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface SendFeedbackConfirmType {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
}

const SendFeedbackConfirm = ({
  modalOpen,
  setModalOpen,
  eventId,
}: SendFeedbackConfirmType) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleFeedbackSend = async () => {
    setLoading(true);
    const result = await sendFeedbackFormToAttendee(
      session.accessToken,
      eventId
    );
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
    setModalOpen(!modalOpen);
  };

  if (!modalOpen) return null;
  return (
    <div className="fixed inset-0 flex top-0 z-50 left-0 md:left-64 bg-black/50 justify-center items-center">
      <div className="bg-white p-10">
        <button onClick={() => setModalOpen(!modalOpen)} className="mb-7">
          close modal
        </button>

        <div className="mt-300px">
          <h3>Are you sure you want to send mails to attendee user?</h3>
          <div className=" flex gap-5 mt-7">
            <button
              className="bg-green-500 font-bold px-4 py-2 "
              onClick={handleFeedbackSend}
              disabled={loading}
            >
              YES
            </button>
            <button
              className="bg-red-500 text-white font-bold px-4 py-2 "
              onClick={() => setModalOpen(!modalOpen)}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFeedbackConfirm;

"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getEventsNameAndId } from "@/app/action";
import SendFeedbackConfirm from "@/components/SendFeedbackConfirm";
import { FormData } from "@/types/attendees";

const SendFeedback = () => {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetched = await getEventsNameAndId(session.accessToken);
      setEvents(fetched);
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchEvents();
    }
  }, [session, status]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <p>SendFeedback</p>
        {events?.map((event) => (
          <div key={event.event_id}>
            <button
              onClick={() => {
                setEventId(event.event_id);
                setModalOpen(!modalOpen);
              }}
              className=" capitalize"
            >
              {event.title}
            </button>
          </div>
        ))}
      </div>

      <SendFeedbackConfirm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        eventId={eventId}
      />
    </>
  );
};

export default SendFeedback;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/components/utility";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import AttendingEventModal from "@/components/AttendingEventModal";
import { confirmAttendingEvent, getEvent } from "@/app/action";
import { toast } from "react-toastify";
import { EventData } from "@/types/attendees";

const EventId = () => {
  const params = useParams();
  const { eventId } = params;
  const { data: session } = useSession();
  const [event, setEvent] = useState<EventData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(eventId as string);
      setEvent(event);
    };

    fetchEvent();
  }, [eventId]);

  const attendingEvent = async () => {
    setProcessing(true);
    const result = await confirmAttendingEvent(eventId, session.accessToken);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setModalOpen(false);
    setProcessing(false);
  };

  return (
    <div className="bg-purple-300">
      <div className="max-w-[1200px] mx-auto p-4 md:py-14 md:px-0">
        {typeof event?.event_image === "string" && (
          <Image src={event?.event_image} alt="" width={365} height={200} />
        )}
        <div className="flex justify-between items-center md:w-[600px]">
          <h2 className="capitalize font-bold my-3">{event?.title}</h2>
          <p className="text-xs bg-purple-200 px-3 capitalize py-1 rounded-md font-bold">
            {event?.category_name}
          </p>
        </div>
        <p className="italic text-sm capitalize mb-5">
          {`${event && formatDate(event?.event_date)}`} /{" "}
          {`${event && formatTime(event?.event_time)}`}
        </p>

        <div className="mb-5">
          <p>
            <span className="font-bold">Event Venue:</span> {event?.venue}
          </p>
          <p>
            <span className="font-bold">Event Organizer:</span>
            {event?.organizer}
          </p>
        </div>

        <button
          className="text-sm bg-purple-800 px-4 py-2 rounded-md text-white font-bold"
          onClick={() => setModalOpen(true)}
        >
          Attending Event?
        </button>
        <p className="mt-6">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn&apos;t anything embarrassing hidden in the middle
          of text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </p>
      </div>
      <AttendingEventModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        attendingEvent={attendingEvent}
        processing={processing}
      />
    </div>
  );
};

export default EventId;

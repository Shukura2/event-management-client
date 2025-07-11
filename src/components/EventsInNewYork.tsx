"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EventCategories from "./EventCategories";
import { formatDate, formatTime } from "./utility";
import { fetchEventCategories, getEvents } from "@/app/action";
import { CategoryType } from "@/types/attendees";

const partnersData = [
  {
    id: 1,
    image: "https://preview.colorlib.com/theme/agenda/images/pixar.png",
    width: 116,
    height: 42,
  },
  {
    id: 2,
    image: "https://preview.colorlib.com/theme/agenda/images/the-pirate.png",
    width: 129,
    height: 63,
  },
  {
    id: 3,
    image: "https://preview.colorlib.com/theme/agenda/images/himalayas.png",
    width: 181,
    height: 32,
  },
  {
    id: 4,
    image: "https://preview.colorlib.com/theme/agenda/images/sa.png",
    width: 59,
    height: 47,
  },
  {
    id: 5,
    image: "https://preview.colorlib.com/theme/agenda/images/south-porth.png",
    width: 187,
    height: 47,
  },
  {
    id: 6,
    image: "https://preview.colorlib.com/theme/agenda/images/himalayas.png",
    width: 181,
    height: 32,
  },
  {
    id: 7,
    image: "https://preview.colorlib.com/theme/agenda/images/sa.png",
    width: 59,
    height: 47,
  },
  {
    id: 8,
    image: "https://preview.colorlib.com/theme/agenda/images/south-porth.png",
    width: 187,
    height: 47,
  },
  {
    id: 9,
    image: "https://preview.colorlib.com/theme/agenda/images/pixar.png",
    width: 116,
    height: 42,
  },
  {
    id: 10,
    image: "https://preview.colorlib.com/theme/agenda/images/the-pirate.png",
    width: 129,
    height: 63,
  },
];

type EventType = {
  category_id: string;
  event_date: string;
  event_id: string;
  event_image: string;
  event_time: string;
  organizer: string;
  title: string;
  venue: string;
};

const EventsInNewYork = () => {
  const [eventCategoryId, setEventCategoryId] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventCategories, setEventCategories] = useState<CategoryType[]>([]);
  const [page] = useState(0);
  const [size] = useState(5);

  const fetchEvents = useCallback(async () => {
    const fetchedEvents = await getEvents(eventCategoryId, page, size);
    setEvents(fetchedEvents);
  }, [eventCategoryId, page, size]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchEventCategories();
      setEventCategories(categories);
      setLoading(false);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (eventCategories.length > 0 && !eventCategoryId) {
      setEventCategoryId(eventCategories[0].id);
    }
  }, [eventCategories, eventCategoryId]);

  useEffect(() => {
    if (eventCategoryId) {
      fetchEvents();
    }
  }, [eventCategoryId, fetchEvents]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="event">
      <div className="mx-auto pt-[180px] max-w-[1200px] p-5 md:py-[210px] md:px-9">
        <EventCategories
          eventCategoryId={eventCategoryId}
          setEventCategoryId={setEventCategoryId}
          eventCategories={eventCategories}
        />

        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 30 },
            500: { slidesPerView: 3, spaceBetween: 25 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1200: { slidesPerView: 6, spaceBetween: 30 },
          }}
        >
          {events.map((event: EventType) => (
            <SwiperSlide key={event.event_id}>
              <div className="text-white text-center font-bold">
                <Link href={`/event/${event.event_id}`}>
                  <div className="w-[160px] h-[310px] relative">
                    <Image
                      src={event.event_image}
                      alt="image"
                      fill
                      sizes="(max-width:768px) 50%"
                      className="object-fill"
                    />
                  </div>
                  <h2 className="mt-7 mb-2 text-lg">{event.title}</h2>
                  <p className="text-xs">
                    {formatDate(event.event_date)} |{" "}
                    <span>{formatTime(event.event_time)}</span>
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {events.length === 0 && <p className="text-white">No items yet</p>}
        <div className="py-[120px]">
          <h2 className="text-white text-center text-6xl py-6 mb-8 partners font-bold">
            Partners
          </h2>
          <div className="flex flex-wrap justify-between gap-y-2">
            {partnersData.map((patner) => (
              <div key={patner.id} className="w-[220px] h-[129px]">
                <Image
                  src={patner.image}
                  alt=""
                  width={patner.width}
                  height={patner.height}
                  className="mt-[60px] mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsInNewYork;

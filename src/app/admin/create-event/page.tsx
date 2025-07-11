"use client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  fetchEventCategories,
  getEvents,
  deleteEvent,
  updateEvent,
  createEventAction,
} from "../../action";
import { formatDate, formatTime } from "@/components/utility";
import ModalEditEvent from "@/components/ModalEditEvent";
import { CategoriesData, EventData } from "@/types/attendees";

const CreateEvent = () => {
  const { data: session } = useSession();
  const [eventCategories, setEventCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [categories, setCategories] = useState<CategoriesData[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [page] = useState(0);
  const [size] = useState(5);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const initialEventData: EventData = {
    category_id: "",
    category_name: "",
    event_date: "",
    event_id: "",
    event_image: "",
    event_time: "",
    organizer: "",
    title: "",
    venue: "",
  };

  const [editEvent, setEditEvent] = useState<EventData>(initialEventData);
  const [editLoading, setEditLoading] = useState(false);

  const handleChangeCreateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeSelectCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEventFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setEditEvent((prev) => ({ ...prev, event_image: file }));
  };

  useEffect(() => {
    setCategoriesLoading(true);
    const eventCategories = async () => {
      const categories = await fetchEventCategories();

      setEventCategories(categories);
      setCategories(categories);
      setCategoriesLoading(false);
    };

    eventCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const fetchEvents = useCallback(async () => {
    const fetchedEvents = await getEvents(categoryId, page, size);
    setEvents(fetchedEvents);
  }, [categoryId, page, size]);

  useEffect(() => {
    if (categoryId) {
      fetchEvents();
    }
  }, [categoryId, page, size, fetchEvents]);

  const handleCreateEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createEventAction(formData, session.accessToken);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      setEvents([...events, result.data]);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    const result = await deleteEvent(eventId, session.accessToken);
    if (result.success) {
      toast.success(result.message);
      const deleteEvent = events.filter((event) => event.event_id !== eventId);
      setEvents(deleteEvent);
    } else {
      toast.error(result.message);
    }
  };

  const openModal = (eventDetails: EventData) => {
    setIsOpenModal(true);
    setEditEvent(eventDetails);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditEvent(initialEventData);
  };

  const handleEditEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditLoading(true);

    const formData = new FormData();
    formData.append("title", editEvent.title);
    formData.append("eventDate", editEvent.event_date);
    formData.append("eventTime", editEvent.event_time);
    formData.append("venue", editEvent.venue);
    formData.append("organizer", editEvent.organizer);
    formData.append("categoryId", editEvent.category_id);

    if (editEvent.event_image instanceof File) {
      formData.append("eventImage", editEvent.event_image);
    }

    const result = await updateEvent(
      editEvent.event_id,
      formData,
      session.accessToken
    );
    if (result.success) {
      toast.success(result.message);
      const editedEvent = events.map((event) =>
        event.event_id === editEvent.event_id
          ? { ...event, ...editEvent }
          : event
      );
      setEvents(editedEvent);
    } else {
      toast.error(result.message);
    }
    setEditLoading(false);
    closeModal();
  };

  return (
    <div className="bg-gradient-to-l from-[#AB00E5] to-[#581479]">
      <div className="h-full md:h-screen p-10">
        <div className="md:w-[50%] bg-white p-5">
          <h2 className="text-center font-bold text-xl">Create Event</h2>
          <form onSubmit={handleCreateEvent}>
            <div className="mt-5">
              <label htmlFor="" className="font-medium">
                Title
              </label>
              <br />
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                className="w-full h-[40px] border border-[#ddd] p-3 mt-2 outline-none"
              />
            </div>

            <div className="flex gap-x-5 mt-5 w-[100%] ">
              <div className="w-[50%]">
                <label htmlFor="" className="font-medium">
                  Event Date
                </label>
                <br />
                <input
                  type="date"
                  name="eventDate"
                  className="h-[40px] w-full border border-[#ddd] p-3 mt-2 outline-none"
                />
              </div>
              <div className="w-[50%]">
                <label htmlFor="" className="font-medium">
                  Event Time
                </label>
                <br />
                <input
                  type="time"
                  name="eventTime"
                  className="w-full h-[40px] border border-[#ddd] p-3 mt-2 outline-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="" className="font-medium">
                Venue
              </label>
              <br />
              <input
                type="text"
                name="venue"
                placeholder="Event Title"
                className="w-full h-[40px] border border-[#ddd] p-3 mt-2 outline-none"
              />
            </div>

            <div className="flex gap-x-5 mt-5 w-[100%]">
              <div className="w-[50%]">
                <label htmlFor="" className="font-medium">
                  Organizer
                </label>
                <br />
                <input
                  type="text"
                  name="organizer"
                  placeholder="Event Organizer"
                  className="w-full h-[40px] border border-[#ddd] p-3 mt-2 outline-none"
                />
              </div>

              <div className="w-[50%]">
                <label htmlFor="" className="font-medium">
                  Category
                </label>
                <br />

                <select
                  name="categoryId"
                  className="w-full h-[40px] border border-[#ddd] p-2 mt-2 outline-none"
                >
                  <option value="">Select Category</option>
                  {eventCategories?.map((category: CategoriesData) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="" className="font-medium">
                Image
              </label>
              <br />
              <input
                type="file"
                name="eventImage"
                className="w-full h-[40px] border border-[#ddd] py-1 px-3 mt-2 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#581479] text-white font-bold px-3 py-1 rounded-md mt-5"
            >
              {loading ? "Processing..." : "Create"}
            </button>
          </form>
        </div>
      </div>

      <div className="px-10 py-10 text-white">
        {categoriesLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className=" flex gap-x-3 md:gap-x-5 mb-5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryId(category.id)}
                  className={`${
                    category.id === categoryId
                      ? "bg-white text-purple-700"
                      : "bg-purple-700 text-white"
                  } px-2 text-xs md:text-base md:px-3 py-1 capitalize font-bold`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {events?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Event Date</th>
                      <th>Event Time</th>
                      <th>Venue</th>
                      <th>Organizer</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events?.map((event) => (
                      <tr key={event.event_id}>
                        <td>{event.title}</td>
                        <td>{formatDate(event.event_date)}</td>
                        <td>{formatTime(event.event_time)}</td>
                        <td>{event.venue}</td>
                        <td>{event.organizer}</td>
                        <td>
                          <button
                            onClick={() => openModal(event)}
                            className="mb-3 md:mb-0 bg-green-400 px-3 py-1 mr-3 text-black font-bold"
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-400 px-3 py-1 font-bold"
                            onClick={() => handleDeleteEvent(event.event_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No events yet</p>
            )}
          </>
        )}
      </div>

      <ModalEditEvent
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        editEvent={editEvent}
        eventCategories={eventCategories}
        handleChangeCreateEvent={handleChangeCreateEvent}
        handleChangeSelectCategory={handleChangeSelectCategory}
        handleEditEvent={handleEditEvent}
        handleChangeEventFile={handleChangeEventFile}
        editLoading={editLoading}
      />
    </div>
  );
};

export default CreateEvent;

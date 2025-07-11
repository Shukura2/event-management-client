import { CategoryType, ModalEditEventType } from "@/types/attendees";
import React from "react";

const ModalEditEvent = ({
  isOpenModal,
  closeModal,
  editEvent,
  eventCategories,
  handleChangeCreateEvent,
  handleChangeSelectCategory,
  handleEditEvent,
  handleChangeEventFile,
  editLoading,
}: ModalEditEventType) => {
  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="w-[50%] bg-purple-200 mt-[90px] text-black p-8">
        <button onClick={closeModal}>close modal</button>

        <h2>Edit Event</h2>
        <form onSubmit={handleEditEvent}>
          <div className="mt-5">
            <label htmlFor="" className="font-medium">
              Title
            </label>
            <br />
            <input
              type="text"
              name="title"
              value={editEvent.title || ""}
              onChange={handleChangeCreateEvent}
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
                name="event_date"
                value={
                  editEvent.event_date
                    ? new Date(editEvent.event_date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChangeCreateEvent}
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
                name="event_time"
                value={editEvent.event_time || ""}
                onChange={handleChangeCreateEvent}
                className="w-full h-[40px] border border-[#ddd] p-3 mt-2 outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="" className="font-medium">
              Venue
            </label>{" "}
            <br />
            <input
              type="text"
              name="venue"
              value={editEvent.venue || ""}
              onChange={handleChangeCreateEvent}
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
                value={editEvent.organizer || ""}
                onChange={handleChangeCreateEvent}
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
                name="category_id"
                className="w-full h-[40px] border border-[#ddd] p-2 mt-2 outline-none"
                value={editEvent.category_id || ""}
                onChange={handleChangeSelectCategory}
              >
                <option value="">Select Category</option>
                {eventCategories.map((category: CategoryType) => (
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
              name="event_image"
              onChange={handleChangeEventFile}
              className="w-full h-[40px] border border-[#ddd] py-1 px-3 mt-2 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={editLoading}
            className="bg-[#581479] text-white font-bold px-3 py-1 rounded-md mt-5"
          >
            {editLoading ? "Processing..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditEvent;

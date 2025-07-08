"use client";
import React from "react";
import { CategoryType } from "@/types/attendees";
import { EventCategoriesProps } from "@/types/attendees";

const EventCategories = ({
  eventCategoryId,
  setEventCategoryId,
  eventCategories,
}: EventCategoriesProps) => {
  return (
    <div className="my-24 lg:flex lg:justify-between">
      <h2 className="text-4xl font-bold text-white" id="target-section">
        Events in New York
      </h2>
      <div className="flex justify-end my-7">
        <div className="flex space-x-5 text-white font-bold">
          {eventCategories?.map((category: CategoryType) => (
            <button
              key={category.id}
              className={`event-cat capitalize  ${
                eventCategoryId === category.id
                  ? "bg-[#AB00E5] text-white"
                  : "bg-white text-[#AB00E5]"
              }`}
              onClick={() => {
                setEventCategoryId(category.id);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  // }
};

export default EventCategories;

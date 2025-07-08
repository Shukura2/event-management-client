"use client";
import { CategoryType } from "@/types/attendees";
import React, { useState } from "react";

type EventCategoryModal = {
  isOpen: boolean;
  onclose: () => void;
  selectedCategory?: CategoryType;
  handleUpdateCategory: (categoryId: string, newTitle: string) => Promise<void>;
};

const ModalEditEventCategory = ({
  isOpen,
  onclose,
  selectedCategory,
  handleUpdateCategory,
}: EventCategoryModal) => {
  const [title, setTitle] = useState(selectedCategory?.title);
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md w-[300px]">
        <button onClick={onclose}>close modal</button>

        <h2 className="text-center font-bold text-xl">Edit Category</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[40px] border border-gray-300 p-2 mt-3 outline-none"
        />
        <button
          className="bg-green-500 px-4 py-2 text-white rounded-md"
          onClick={() =>
            handleUpdateCategory(
              selectedCategory?.id ?? "",
              selectedCategory?.title ?? ""
            )
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalEditEventCategory;

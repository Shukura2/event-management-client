"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createEventCategory,
  fetchEventCategories,
  deleteEventCategory,
  updateEventCategory,
} from "../../action";
import ModalEditEventCategory from "@/components/ModalEditEventCategory";
import { useSession } from "next-auth/react";
import { CategoryType } from "@/types/attendees";

const CreateEventCategory = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [eventCategories, setEventCategories] = useState<CategoryType[] | []>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await fetchEventCategories();
      setEventCategories(fetchedCategories);
      setCategoryLoading(false);
    };

    fetchCategories();
  }, []);

  const handleSelectedCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!selectedCategory) return;

    setSelectedCategory((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = await createEventCategory(formData, session.accessToken);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      setEventCategories([...eventCategories, result.data]);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const openModal = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (categoryId: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = await deleteEventCategory(categoryId, session.accessToken);
    if (result.success) {
      toast.success(result.message);
      const deleteEvent = eventCategories.filter(
        (event) => event.id !== categoryId
      );
      setEventCategories(deleteEvent);
    } else {
      toast.error(result.message);
    }
  };

  const handleUpdateCategory = async (
    categoryId: string,
    newTitle: string
  ): Promise<void> => {
    const result = await updateEventCategory(
      categoryId,
      newTitle,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.accessToken
    );
    if (result.success) {
      toast.success(result.message);
      const updateEvent = eventCategories.map((event) =>
        event.id === categoryId ? { ...event, title: newTitle } : event
      );
      setEventCategories(updateEvent);
    } else {
      toast.error(result.message);
    }
    handleCloseModal();
  };

  return (
    <div className="bg-gradient-to-l from-[#AB00E5] to-[#581479]">
      <div className="px-10 py-10">
        <div className="lg:w-[30%] h-[250px] bg-white p-5">
          <h2 className="text-center font-bold text-xl">Event Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="">Title</label> <br />
              <input
                type="text"
                name="title"
                placeholder="Event Category"
                className="w-full h-[40px] border border-[#ddd] p-5 mt-2 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#581479] text-white font-bold px-3 py-1 rounded-md mt-5"
              disabled={loading}
            >
              {loading ? "Processing..." : "Create"}
            </button>
          </form>
        </div>
      </div>

      <div className="px-10 py-10">
        {categoryLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {eventCategories.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-white font-bold w-[50%] text-left">
                      Title
                    </th>
                    <th className="w-[25%]"></th>
                    <th className="w-[25%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {eventCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="text-white text-lg capitalize">
                        {category.title}
                      </td>
                      <td>
                        <button
                          className="bg-green-400 px-5 py-2 rounded-md"
                          onClick={() => openModal(category)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-400 px-5 py-2 rounded-md"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No item yet</p>
            )}
          </>
        )}
      </div>

      <ModalEditEventCategory
        isOpen={isModalOpen}
        onclose={handleCloseModal}
        selectedCategory={selectedCategory}
        handleSelectedCatChange={handleSelectedCatChange}
        handleUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
};

export default CreateEventCategory;

"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createFeedbackAndRating } from "../action";
import { toast } from "react-toastify";

const FeedbackPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await createFeedbackAndRating({
      feedback: formData.get("feedback"),
      rating,
      token,
    });
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    form.reset();
    setRating(0);
    setLoading(false);
  };

  return (
    <div className=" feedback-bg">
      <div className="sm:max-w-[650px] md:max-w-[730px] lg:max-w-[1200px] mx-auto px-4 md:px-0 flex justify-center items-center h-full">
        <div className=" bg-[#AB00E5] bg-opacity-80 w-[60%] h-[300px] rounded-lg flex justify-center items-center">
          <div className=" w-[75%]">
            <form onSubmit={handleSubmitFeedback}>
              <textarea
                name="feedback"
                placeholder="Feedback"
                className=" w-full px-3 py-1 h-[120px]"
              />
              <div className=" flex gap-x-2 my-5">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const currentRating = idx + 1;
                  return (
                    <label key={idx}>
                      <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        className="star"
                        size={20}
                        color={
                          currentRating <= (hover || rating)
                            ? "#FFC107"
                            : "#E4E5E9"
                        }
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>

              <button
                type="submit"
                className=" bg-white px-3 py-1 text-black font-bold rounded"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

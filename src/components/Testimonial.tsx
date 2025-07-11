"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getFeedback } from "@/app/action";
import { TestimonialType } from "@/types/attendees";

const Testimonial = () => {
  const [feedback, setFeedback] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      const fetched = await getFeedback();
      setFeedback(fetched);
      setLoading(false);
    };

    fetchFeedback();
  }, []);

  return (
    <div className="bg-purple-200 py-28 ">
      <div className="max-w-[1200px] mx-auto p-5 md:py-7 md:px-9">
        <h2 className="text-black text-3xl mb-5">Testimonial</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-wrap md:gap-x-6 ">
              {feedback.length <= 0 ? (
                <p>No items yet</p>
              ) : (
                feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl px-9 py-6 shadow-md"
                  >
                    <p className="text-xl capitalize">{item.feedback}</p>
                    <p className="text-xl capitalize mb-8">{item.rating}</p>
                    <div className="flex items-end gap-x-5">
                      {item.avatar === "undefined" ? (
                        <Image
                          src="/user-login-avatar.jpg"
                          alt="Avatar"
                          width={80}
                          height={80}
                        />
                      ) : (
                        <Image
                          src={item.avatar ?? ""}
                          alt="Avatar"
                          width={80}
                          height={80}
                        />
                      )}
                      <h2>{item.username}</h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonial;

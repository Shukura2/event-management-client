"use client";
import { getFeedback } from "@/app/action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
    <div>
      <h2>Testimonial</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {feedback.map((item, idx) => (
            <div key={idx}>
              {item.avatar === "undefined" ? (
                <Image
                  src="/user-login-avatar.jpg"
                  alt="Avatar"
                  width={60}
                  height={60}
                />
              ) : (
                <Image
                  src={item.avatar ?? ""}
                  alt="Avatar"
                  width={60}
                  height={60}
                />
              )}
              <h2>{item.username}</h2>
              <p>{item.feedback}</p>
              <p>{item.rating}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Testimonial;

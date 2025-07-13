"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getAttendeeSummary } from "@/app/action";
import { AttendeeSummaryData } from "@/types/attendees";

const AttendeeSummary = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [attendeeSummary, setAttendeeSummary] = useState<AttendeeSummaryData[]>(
    []
  );

  useEffect(() => {
    const fetchAttendeeSummary = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const fetched = await getAttendeeSummary(session?.accessToken);
      setAttendeeSummary(fetched);
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchAttendeeSummary();
    }
  }, [session, status]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {attendeeSummary.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-[#AB00E5] font-bold text-left">Event Name</th>
              <th className="text-[#AB00E5] font-bold w-[50%] text-left">
                No of Attenders
              </th>
            </tr>
          </thead>

          <tbody>
            {attendeeSummary.map((item) => (
              <tr key={item.event_id}>
                <td className="capitalize">{item.event_name}</td>
                <td className="capitalize">{item.number_of_attendees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No items yet</div>
      )}
    </div>
  );
};

export default AttendeeSummary;

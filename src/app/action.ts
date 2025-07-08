"use server";
import { EventData, FormData } from "@/types/attendees";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createEventCategory = async (
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/v1/event-category`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const fetchEventCategories = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/event-categories`,
    });
    return data.data;
  } catch (error) {
    return error;
  }
};

export const deleteEventCategory = async (
  categoryId: string,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/v1/event-category/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateEventCategory = async (
  categoryId: string,
  input: string,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/v1/event-category/${categoryId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { title: input },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const createEventAction = async (formData: FormData, token: string) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/v1/event`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const getEvents = async (
  categoryId: string,
  page: number,
  size: number
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/events`,
      params: { categoryId, page, size },
    });
    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/event/${eventId}`,
    });
    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: EventData,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/v1/event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: eventData,
    });
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteEvent = async (eventId: string, token: string) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/v1/event/${eventId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const confirmAttendingEvent = async (eventId: string, token: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}/v1/attending-event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const getEventsNameAndId = async (token: string) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/get-events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const sendFeedbackFormToAttendee = async (
  token: string,
  eventId: string
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/v1/feedback-and-ratings/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAttendeeSummary = async (token: string) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/event-summary`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const createFeedbackAndRating = async (formData: FormData) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/v1/feedback-and-ratings`,
      data: formData,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getFeedback = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/v1/feedbacks-and-ratings`,
    });
    console.log(data.message, "dm");
    return data.message;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

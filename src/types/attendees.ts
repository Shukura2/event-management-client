export interface AttendeeSummaryData {
  event_id: string;
  event_name: string;
  number_of_attendees: string;
}

export interface CategoriesData {
  id: string;
  title: string;
}

export interface EventData {
  category_id: string;
  category_name: string;
  event_date: string;
  event_id: string;
  event_image: string | File;
  event_time: string;
  organizer: string;
  title: string;
  venue: string;
}

export interface FormData {
  [key: string]: string;
}

export interface AttendingEventModalType {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  attendingEvent: () => Promise<void>;
  processing: boolean;
}

export interface EventCategoriesProps {
  eventCategoryId: string;
  setEventCategoryId: (id: string) => void;
  eventCategories: CategoryType[];
}

export interface CategoryType {
  id: string;
  title: string;
}

export interface ModalEditEventType {
  isOpenModal: boolean;
  closeModal: () => void;
  editEvent: EventData;
  eventCategories: CategoryType[];
  handleChangeCreateEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleEditEvent: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChangeEventFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editLoading: boolean;
}
export interface TestimonialType {
  avatar: undefined | string;
  feedback: string;
  username: string;
  rating: number;
}

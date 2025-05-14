export type SeatData = {
  _id: string;
  code: string;
  roomId: {
    _id: string;
    name: string;
    location: string;
    status: string;
  };
  status: string;
  session?: string | null;
  startTime?: string | null;
  usageDuration?: number | null;
  endTime?: string | null;
  timeRemaining?: number | null;
};

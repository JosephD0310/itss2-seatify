export type SeatData = {
    _id: string;
    code: string;
    roomId: {
        _id: string;
        name: number;
        location: string;
        status: string;
    };
    status: string;
    startTime: string;
    usageDuration: number;
    session: string;
};

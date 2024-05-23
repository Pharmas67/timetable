export interface User {
    id: BinaryData;
    username: String,
    email: String
}

export interface Appointment {
    label: string;
    timeframe: string;
    description: string;
}
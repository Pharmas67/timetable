export interface User {
    id: BinaryData,
    username: String,
    email: String,
    image: String
}

export interface Appointment {
    id: BinaryData,
    name: String,
    startDate: String,
    endDate: String,
    category: String,
    description: String,
}

export interface targetDay {
    day: Number,
    month: String,
    year: Number
}
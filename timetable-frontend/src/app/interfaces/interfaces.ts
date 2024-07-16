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
    day: Number,
    month: String,
    year: Number
}
export interface User {
    id: BinaryData,
    username: String,
    email: String,
    imageName: String
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

export interface Friendship {
    userId: BinaryData,
    friendId: BinaryData,
    status: String
}

export interface BlockedRelationship {
    id: Number,
    blockerId: BinaryData,
    blockedId: BinaryData
}
export interface User {
    _id: string
    firstName: string
    lastName: string
    username: string
    photoUrl: string | null
    accessToken: string
}

export interface NextCursor {
    _id: string
    createdAt: number
}
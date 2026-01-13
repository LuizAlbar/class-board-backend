export interface RefreshTokenDTO {
    id: string
    token: string
    userId: string
    expiresAt: Date
}

export interface CreateRefreshTokenDTO {
    token: string
    userId: string
    expiresAt: Date
}
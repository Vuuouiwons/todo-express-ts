export interface GuardResponse {
    userId: string;
}

export interface GuardPayload {
    iat: string;
    exp: string;
    token: string;
}

export interface IGuardService {
    verify(payload: GuardPayload): GuardResponse | null;
}
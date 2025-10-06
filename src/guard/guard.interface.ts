export interface GuardResponse {
    userId: string;
}

export interface GuardPayload {
    token: string;
}

export interface IGuardService {
    verify(token: GuardPayload): GuardResponse | null;
}
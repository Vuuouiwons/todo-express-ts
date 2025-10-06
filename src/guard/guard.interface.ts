export interface GuardResponse {
    userId: string;
}

export interface GuardPayload {
    token: string;
}

export interface IGuardService {
    verify(payload: GuardPayload): GuardResponse | null;
}
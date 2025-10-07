export interface GuardResponse {
    userId: string;
}

export interface GuardRequest {
    token: string;
}

export interface IGuardService {
    verify(token: GuardRequest): GuardResponse;
}
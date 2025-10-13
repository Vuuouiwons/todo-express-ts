export interface GuardResponse {
    userId: string;
}

export interface GuardRequest {
    tokenHeader?: string;
}

export interface IGuardService {
    verify(token: GuardRequest): GuardResponse;
}
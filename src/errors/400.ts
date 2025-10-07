export class UsernameExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UsernameExistsError';
    }
}

export class UsernameDoesNotExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UsernameDoesNotExistsError';
    }
}

export class CredentialError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CredentialError';
    }
}

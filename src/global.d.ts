declare module "*";

interface Session {
	id: string;
	secretHash: Uint8Array;
	createdAt: Date;
}

interface SessionWithToken extends Session {
	token: string;
}

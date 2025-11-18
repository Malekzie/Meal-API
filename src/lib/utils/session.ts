import { Prisma } from "../../../dist/generated/prisma/client.js";
import type { PrismaClient } from "../../../dist/generated/prisma/client.js";
import { constantTimeEqual, generateSecureRandomString } from "./randoms.js";

const sessionExpiresInSeconds = 60 * 60 * 24;

export async function createSession(
	prisma: PrismaClient
): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + "." + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		token
	};

	await prisma.session.create({
		data: {
			id,
			secret_hash: session.secretHash as Uint8Array<ArrayBuffer>,
			created_at: session.createdAt
		}
	});
	return session;
}

export async function validateSessionToken(
	prisma: PrismaClient,
	token: string
): Promise<Session | null> {
	const tokenParts = token.split(".");
	if (tokenParts.length !== 2) {
		return null;
	}

	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(prisma, sessionId as string);
	if (!session) {
		return null;
	}

	const tokenSecretHash = await hashSecret(sessionSecret as string);
	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
	if (!validSecret) {
		return null;
	}

	return session;
}

export async function getSession(
	prisma: PrismaClient,
	sessionId: string
): Promise<Session | null> {
	const now = new Date();

	const adaptError = (customThrowFn: () => Error) => (error: unknown) => {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			throw customThrowFn();
		}
		throw error;
	};

	const result = await prisma.session
		.findFirstOrThrow({
			where: {
				id: sessionId
			}
		})
		.catch(adaptError(() => new Error("Error: Session not found!")));

	const session: Session = {
		id: result.id,
		secretHash: result.secret_hash,
		createdAt: new Date(result.created_at)
	};

	if (
		now.getTime() - session.createdAt.getTime() >=
		sessionExpiresInSeconds * 1000
	) {
		await deleteSession(prisma, sessionId);
		return null;
	}

	return session;
}

export async function deleteSession(
	prisma: PrismaClient,
	sessionId: string
): Promise<void> {
	await prisma.session.delete({
		where: {
			id: sessionId
		}
	});
}

async function hashSecret(secret: string): Promise<Uint8Array> {
	const secretBytes = new TextEncoder().encode(secret);
	const secretHashBuffer = await crypto.subtle.digest(
		"SHA-256",
		secretBytes
	);
	return new Uint8Array(secretHashBuffer as ArrayBuffer);
}

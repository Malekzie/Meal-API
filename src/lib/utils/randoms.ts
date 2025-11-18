export function generateSecureRandomString(): string {
	const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = "";
	for (let i = 0; i < bytes.length; i++) {
		id += alphabet[bytes[i]! >> 3];
	}

	return id;
}

export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i]! ^ b[i]!;
	}

	return c === 0;
}

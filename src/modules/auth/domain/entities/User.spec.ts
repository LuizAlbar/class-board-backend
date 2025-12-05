import { describe, expect, it, test } from "vitest";
import { User, UserRole } from "./User.ts";

describe("User Entity", () => {
	it("should be able to get user data", async () => {
		const user = new User({
			id: "1",
			name: "John",
			email: "john@email.com",
			password: "123456",
			created_at: new Date(),
			updated_at: new Date(),
			role: UserRole.ESTUDANTE,
		});

		expect(user.id).toBe("1");
	});
});

import { describe, test, expect } from "vitest";
import axios from "axios";

const BACKEND_URL = "http://localhost:5500/api/v0"

describe("Post request", () => {
    test("Send user data", async () => {
            const username = `orca${Math.random()}`;
            const email = `orca${Math.random()}@gmail.com`;
            const password = "1231231231";

            const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password
            })

            expect(response.status).toBe(201);
    })
})
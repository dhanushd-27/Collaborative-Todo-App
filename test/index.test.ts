import { describe, test, expect } from "vitest";
import axios from "axios";
// import axios2, { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

// const axios = {
//     post: async <T = any>(...args: Parameters<typeof axios2.post>): Promise<AxiosResponse<T> | undefined> => {
//         try {
//             const res = await axios2.post(...args);
//             return res;
//         } catch (e) {
//             const error = e as AxiosError;
//             return error.response;
//         }
//     },

//     put: async <T = any>(...args: Parameters<typeof axios2.put>): Promise<AxiosResponse<T> | undefined> => {
//         try {
//             const res = await axios2.post(...args);
//             return res;
//         } catch (e) {
//             const error = e as AxiosError;
//             return error.response;
//         }
//     },

//     delete: async <T = any>(...args: Parameters<typeof axios2.delete>): Promise<AxiosResponse<T> | undefined> => {
//         try {
//             const res = await axios2.post(...args);
//             return res;
//         } catch (e) {
//             const error = e as AxiosError;
//             return error.response;
//         }
//     },

//     get: async <T = any>(...args: Parameters<typeof axios2.get>): Promise<AxiosResponse<T> | undefined> => {
//         try {
//             const res = await axios2.post(...args);
//             return res;
//         } catch (e) {
//             const error = e as AxiosError;
//             return error.response;
//         }
//     },
// };

const BACKEND_URL = "http://localhost:5500/api/v0"

describe("Sign Up", () => {

    // Successfull User Sign Up
    test("Successfull User Sign Up", async () => {
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

    // Invalid User Input
    test("Invalid User Input", async () => {
        const username = `orca${Math.random()}`;
        const email = `orca${Math.random()}.com`;
        const password = "1231231231";

        try {
            await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password
            })

        } catch (error: AxiosError) {
            expect(error.response.status).toBe(400);
        }
    })

    // User Already Exists
    test("User Already Exists", async () => {
        const username = `orca${Math.random()}`;
        const email = `orca${Math.random()}@gmail.com`;
        const password = "1231231231";

        try {

            await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password
            })

            await axios.post(`${BACKEND_URL}/user/signup`, {
                username,
                email,
                password
            })

        } catch (error: AxiosError) {
            expect(error.response.status).toBe(409);
        }
    })

    // How to make a test if the database url doesn't work?
})
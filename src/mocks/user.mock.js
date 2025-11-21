import { fakerES_MX as fa } from "@faker-js/faker"
import { createHash } from "../utils/index.js"

export const generateMockUser = async () => {
    return {
        first_name: fa.person.firstName(),
        last_name: fa.person.lastName(),
        email: fa.internet.email(),
        password: await createHash("coder123"),
        role: fa.helpers.arrayElement(["user", "admin"]),
        pets: [],
    }
}

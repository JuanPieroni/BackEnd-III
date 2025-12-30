import { fakerES_MX as fa } from "@faker-js/faker"
import { createHash } from "../utils/index.js"

export const generateMockUser = async () => {
    const first_name = fa.person.firstName()
    const last_name = fa.person.lastName()

    const primeraLetra = first_name[0].toLowerCase()
    const primerApellido = last_name.split(" ")[0].toLowerCase()
    const random = Math.floor(Math.random() * 100) + 1
    const email = `${primeraLetra}${primerApellido}${random}@coder.com.ar`

    return {
        first_name,
        last_name,
        email,
        password: await createHash("coder123"),
        role: fa.helpers.arrayElement(["user", "admin"]),
        pets: [],
    }
}

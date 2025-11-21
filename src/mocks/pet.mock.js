import { fakerES_MX as fa } from "@faker-js/faker"

export const generateMockPet = () => {
    return {
        name: fa.animal.petName(),
        specie: fa.animal.type(),
        birthDate: fa.date.past({ years: 10 }),
        adopted: false,
    }
}

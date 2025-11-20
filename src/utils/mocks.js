/* import {fakerES_MX as fa} from "@faker-js/faker"

export const generateMockPet=()=>{
    // {name,specie,birthDate}
    let name=fa.animal.petName()
    let specie=fa.animal.type()
    let birthDate=fa.date.past({ years: 10 })

    return {
        name, 
        specie, 
        birthDate
    }
}

// console.log(generateMockPet()) */

export const generateMockPet = () => {
    const mascotas = {
        name: fa.animal.petName(),
        specie: fa.animal.type(),
        birthDate: fa.date.past({ years: 10 }),
    }
    return mascotas
}

  
import { Patient } from "../src/models";

let doc = {
    _type: "patient",
    email: "test@email.com",
    password: "password",
    
    profile: {
        name: "William Ohio",
        address: "4001 Street Avenue, Dallas, TX 75205",
        gender: "male",
        age: 18,

        medicalHistory: new Map(),
        medication: new Map(),
        appointments: [{date: new Date(), description: "Example appointment today."}],

        ssn: "111-11-1111"
    }
};

Patient.create(doc);
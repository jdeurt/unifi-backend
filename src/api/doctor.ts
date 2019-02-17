import { Request, Response } from "express";
import { Patient, PatientInterface } from "../models";

/**
 * /api/doctor/:id
 */
export function getPatient(req: Request, res: Response) {
    const id = req.params.id;

    Patient.findById(id, (err, doc) => {
        let user = doc as PatientInterface;

        res.json(user);
    });
};

/**
 * /api/doctor/:id/:item
 */
export function setPatientData(req: Request, res: Response) {
    const id = req.params.id;
    const item = req.params.item;
    const val = req.body.val;

    console.log(val);

    Patient.findById(id, (err, doc) => {
        let user = doc as PatientInterface;

        //@ts-ignore
        user.profile.medication.push({name: "Summedicin", dose: "3/day"});
        //@ts-ignore
        user.profile.medication.push({name: "Acutane", dose: "2/day"});
        user.save((err, doc) => {
            console.log(doc);
            res.json(doc);
        });
    });
};
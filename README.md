# Unifi - HackDFW 2019

## Inspiration

We fixed the extremely prevalent issue in Hospitals of data storage/transfer. A combination of Children's Hospital's challenge statement and Capital One's financial hack led us to create an easy to use portal for patients and doctors, to streamline information/medical history retrieval and aid patients in their attaining of healthcare.

## What it does
Our project implements both a patient side and a doctor side.

The patient is presented with a minimalist design login portal where the user may input whether they are a patient or a doctor. On the Patient's end, one can view their monthly checkup schedule, view their current medicines, and even custom search for loans/healthcare plans. There also exists a barcode, unique to each patient, which allows the doctor to scan them in so they know exactly who they are checking up on, and all of their medical history.

From the doctors end, the doctor is presented with a list of their patients along with a full profile for each patient. They also can assign prescriptions to their patients' profile.

## How we built it
The front end is built on Angular and BootStrap. On the backend, we are using NodeJS, ExpressJS, MongoDB for doctor/patient records, and Passport for user authentication.

[jdeurt](https://github.com/jdeurt) Built the frontend and backend.

[gaiscioch](https://github.com/gaiscioch) and [wdeng112](https://github.com/wdeng112) worked on an Alexa Skill to connect doctors to the patient data via voice.

[wdeng112](https://github.com/wdeng112) Built the health insurance assistant.

## Challenges we ran into
Figuring out how to properly match health insurance plans and providers to patients based on their inputted data.

Staying awake

Learning if and how Alexa works.

Four people speaking over each other on their preferred method of sorting two linked arrays in Python.

## Accomplishments that we're proud of
We are proud of making a coherent webapp that streamlines medical data for ease of access for both patients and doctors. With a system that can provide a full patient-background and assist the patients with their finances, our product will better the lives of millions.

We are happy with our product and hope you all feel the same way.

## What we learned
[jdeurt](https://github.com/jdeurt) learned he should get sleep when grinding on that code. This is [wdeng112](https://github.com/wdeng112)'s first experience with web development, and [gaiscioch](https://github.com/gaiscioch)'s first experience working with Amazon Alexa Skills. We will definitely build on these skills in the future.

We also learned how to work more collaboratively, which was imperative to our success in a project of a scale such as this.

## What's next
With more time, we would finish the Amazon Alexa skill, adding voice recognition, verbal password authentication, and querying of proper patients for authenticated doctors.

It would also be interesting to make this project live to see how much data flows between patients and doctors, and also to see how we can drastically reduce paper-document waste.

## Built With
TypeScript, JavaScript, ExpressJS, NodeJS, Angular, BootStrap, CSS, HTML, MongoDB, Mongoose.

## Location
Floor 1, Table C1, Section 2

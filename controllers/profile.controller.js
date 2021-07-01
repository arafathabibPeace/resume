const Profile = require('../models/profile.model');
const Person = require('../models/person.model');
const Picture = require('../models/picture.model')
const Contact = require('../models/contact.model')
const Skill = require('../models/skill.model')
const Job = require('../models/job.model')
const Company = require('../models/company.model')
const Date = require('../models/date.model');
const Education = require('../models/education.model');
const Course = require('../models/course.model')
const Award = require('../models/award.model');
const CharacterReference = require('../models/characterReference.model');
const skillModel = require('../models/skill.model');

const employeeController = {
    create: async (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }
        const parentObject = await Person.findById({ _id: req.body.foreign_id });
        if (!parentObject) {
            return res.status(400).send('Parent object is not found')
        }
        await Profile.create({ ...req.body, onModel: 'Person' })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.send(err.message || 'Something went wrong.')
            })
    },

    findAll: async (req, res) => {
        await Profile.find()
            .populate({ path: 'foreign_id' })
            .then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findById: async (req, res) => {
        await Profile.findById(req.params.id).populate('foreign_id')
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employee id does not found');
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Employee id does not found')
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    findByProfilename: async (req, res) => {

        await Profile.find({ profilename: req.params.profilename }).select('-onModel -__v')
            .then(data => {
                if (!data) {

                    return res.status(404).send('Profilename id does not found');
                }

                data.map(async i => {

                    const person = await Person.find({ _id: i.foreign_id }).select('-onModel -__v')
                    const picture = await Picture.find({ foreign_id: i.foreign_id }).select('-onModel -__v')
                    const contacts = await Contact.find({ foreign_id: i.foreign_id }).select('-onModel -__v')
                    const skills = await Skill.find({ foreign_id: i.foreign_id }).select('-onModel -__v -createdAt -updatedAt')
                    const licensesCertificatesTrainings = await Award.find({ foreign_id: i.foreign_id }).select('-onModel -__v -createdAt -updatedAt')
                    const education = await Education.find({ foreign_id: i.foreign_id }).select('-onModel -__v -createdAt -updatedAt')
                    const characterReference = await CharacterReference.find({ foreign_id: i.foreign_id }).select('-onModel -__v -createdAt -updatedAt')

                    let picturePath = ''
                    if (picture) {
                        picture.map((item) => {
                            return picturePath = item.picture_path
                        })
                    }
                    let licenseCertificateTraningList = []
                    if (licensesCertificatesTrainings) {

                        for (let i in licensesCertificatesTrainings) {
                            const id = licensesCertificatesTrainings[i]._id
                            const company = await Company.find({ foreign_id: id }).select('-onModel -__v -createdAt -updatedAt')
                            const date = await Date.find({ foreign_id: id }).select('-onModel -__v -createdAt -updatedAt')
                            licenseCertificateTraningList.push({ licenseCertificateTraining: licensesCertificatesTrainings[i], company: company, date_acquired: date })
                        }
                    }

                    let employmentList = []
                    let personDetails = {}
                    if (person) {
                        for (let i in person) {
                            personDetails = { _id: person[i]._id, first_name: person[i].first_name, middle_name: person[i].middle_name, last_name: person[i].last_name }

                            let employment = {}
                            const job = await Job.find({ foreign_id: person[i]._id }).select('-onModel -__v -createdAt -updatedAt')

                            for (let j in job) {
                                const jobId = job[j]._id
                                const company = await Company.find({ foreign_id: jobId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')
                                const dates = await Date.find({ foreign_id: jobId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')
                                const skills = await skillModel.find({ foreign_id: jobId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')



                                for (let k in company) {
                                    let companyId = company[k]._id
                                    const contacts = await Contact.find({ foreign_id: companyId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')
                                    employment = {
                                        position: { job: job[i], skills: skills },
                                        employer: { company: { _id: company[k]._id, company_name: company[k].company_name, contacts: contacts } },
                                        dates: dates,
                                    }
                                }

                            }
                            employmentList.push(employment)
                        }
                    }

                    let educationList = []
                    if (education) {
                        for (let i in education) {
                            const educationId = education[i]._id
                            const course = await Course.find({ foreign_id: educationId })
                            const school = await Company.find({ foreign_id: educationId })
                            const schoolYear = await Date.find({ foreign_id: educationId })
                            const awards = await Award.find({ foreign_id: educationId })

                            let courseDetails = {}
                            if (course) {
                                course.map(i => {
                                    return courseDetails = { course_name: i.course_name, course_major: i.course_major }
                                })
                            }
                            let schoolDetails = {}
                            let awardList = []
                            if (school) {
                                for (let x in school) {
                                    const companyId = school[x]._id
                                    const school_contact = await Contact.find({ foreign_id: companyId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')

                                    if (awards) {
                                        for (let y in awards) {
                                            const awardId = awards[y]
                                            const date = await Date.find({ foreign_id: awardId }).select('-foreign_id -onModel -createdAt -updatedAt -__v')
                                            awardList.push({ award: awards[y], date_awarded: date })
                                        }
                                    }
                                    schoolDetails = { school_name: school[x].company_name, school_contact: school_contact }
                                }
                                educationList.push({ education: education[i], course: courseDetails, school_year: schoolYear, school_details: schoolDetails, awards: awardList })
                            }
                        }
                    }

                    let characterReferenceList = []
                    let p = {}
                    let jo = {}
                    let c = {}
                    let c2 = {}
                    if (characterReference) {
                        for (let i in characterReference) {
                            const person = await Person.find({ foreign_id: characterReference[i]._id })
                            if (person) {
                                for (let k in person) {
                                    p = person[k]
                                    const contact = await Contact.find({ foreign_id: person[k]._id })

                                    c2 = contact


                                    const job = await Job.find({ foreign_id: person[k]._id })
                                    if (job) {
                                        for (let j in job) {
                                            jo = job[j]
                                            const company = await Company.find({ foreign_id: job[j]._id })
                                            if (company) {
                                                for (let x in company) {
                                                    c = company[x]
                                                }
                                            }
                                        }
                                    }
                                    characterReferenceList.push({ person: p, job: jo, employer: c, contact: c2 })
                                }
                            }
                        }
                    }

                    return res.send({
                        profile: data,
                        person: personDetails,
                        picture: picturePath,
                        contacts: contacts,
                        skills: skills,
                        licensesOrCertificatesOrTrainings: licenseCertificateTraningList,
                        employments: employmentList,
                        educations: educationList,
                        characterReferences: characterReferenceList
                    });
                })
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send('Profile  does not found')
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })
    },
    update: async (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: 'Please fill all required field' })
        }

        await Profile.findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).send('Employee id does not exist');
                }
                res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    res.status(404).send('Employee id does not exist')
                }
                res.status(500).send('Employee id does not exist')
            })

    },
    delete: async (req, res) => {
        await Profile.findByIdAndDelete(req.body.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send('Employee id not found')
                }
                return res.send(data);
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send("user not found with id " + req.body.id);
                }
                return res.status(500).send(err.message || 'Something went wrong');
            })

    }
}
module.exports = employeeController;
const Service = require("../models/ServicesModel")

const pollCreation = async (req, res) => {
    try {
        const newPoll = new Service({
            ...req.body,    
            admin: req.user.userId
        });
        await newPoll.save();

        res.send({
            success: true,
            message: " Added Successfully",
            body: newPoll
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error while Creating!" + error,
            body: null
        })
    }
}

const serviceDeletion = async (req, res) => {
    try {
        const newPoll = await Service.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Service Deleted Successfully",
            body: newPoll
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error while Deleting Service" + error,
            body: null
        })
    }
}

const getServicesByToken = async (req, res) => {
    try {
        const newPoll = await Service.find({admin:req.user.userId});
        res.send({
            success: true,
            message: "Poll Get Successfully",
            body: newPoll
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error while Gettiing Poll" + error,
            body: null
        })
    }
}

const getServices = async (req, res) => {
    try {
        const newPoll = await Service.find();
        res.send({
            success: true,
            message: "Services Get Successfully",
            body: newPoll
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error while Gettiing Services" + error,
            body: null
        })
    }
}
const getPollsById = async (req, res) => {
    try {
        const mcqs = await Poll.find({admin:req.user.userId});
        const yon = await YON.find({userId:req.user.userId});
        const data = {
            mcqs,
            yon
        }
        res.send({
            success: true,
            message: "Poll Get Successfully",
            body: data

            
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error while Gettiing Poll" + error,
            body: null
        })
    }
}

const mcqs = async (req, res) => {
    try {
        const mcqs = await MCQS({
            ...req.body,
            userId:req.user.userId
        });
        await mcqs.save();
        res.send({
            success: true,
            message: "added",
            body: mcqs
        })
    } catch (error) {
        res.send({
            success: false,
            message: "error" + error,
            body: null
        })
    }
}

const getAllMcqsDetails = async (req, res) => {
    try {
        const mcqs = await MCQS.find().populate("pollId").populate("userId");
        res.send({
            success: true,
            message: "Retrived",
            body: mcqs
        })
    } catch (error) {
        res.send({
            success: false,
            message: "error" + error,
            body: null
        })
    }
}

const getAllMcqsDetailsByPollId = async (req, res) => {
    try {
         const isEmpty = await MCQS.find({pollId:req.params.id});
         if(isEmpty.length ===0 ){
            return  res.send({
                success: true,
                message: "Retrived",
                body: {
                    mcqsDetails: null,
                    voteCounts:null
                }
            })
         }
        const mcqs = await MCQS.find({ pollId: req.params.id }).populate("pollId").populate("userId");

        const candidate1 = mcqs[0].pollId.option_1
        const candidate2 = mcqs[0].pollId.option_2
        const candidate3 = mcqs[0].pollId.option_3
        const candidate4 = mcqs[0].pollId.option_4

        var candidate1Votes = 0;
        var candidate2Votes = 0;
        var candidate3Votes = 0;
        var candidate4Votes = 0;

        mcqs.forEach((e) => {
            if (e.selectedCandidate === candidate1) {
                candidate1Votes++;
            }
            if (e.selectedCandidate === candidate2) {
                candidate2Votes++;
            }
            if (e.selectedCandidate === candidate3) {
                candidate3Votes++;
            }
            if (e.selectedCandidate === candidate4) {
                candidate4Votes++;
            }
        });

        res.send({
            success: true,
            message: "Retrived",
            body: {
                mcqsDetails: mcqs,
                voteCounts: {
                    option1: candidate1Votes,
                    option2: candidate2Votes,
                    option3: candidate3Votes,
                    option4: candidate4Votes
                },
                totalVotes : Math.floor(candidate1Votes+candidate2Votes+candidate3Votes+candidate4Votes)
            }
        })
    } catch (error) {
        res.send({
            success: false,
            message: "error" + error,
            body: null
        })
    }
}

const voterDetails = async( req , res ) =>{
    try {
        const poll = await MCQS.find({pollId: req.params.id}).populate("userId");
        const voterDetails = poll.map((item)=>{
            return {
                selectedCandidate:item.selectedCandidate,
                voterName: item.userId.name
            }
        })
        
           res.send({
            success:true,
            message:"Retrieved Successfully",
            body:voterDetails
           })
    } catch (error) {
        res.send({
            success:false,
            message:"Error" ,  error,
            body:null
           })
    }
}


module.exports = {
    pollCreation,  getServices , getServicesByToken , serviceDeletion
}
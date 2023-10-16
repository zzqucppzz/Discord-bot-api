const discordService = require("../services/discordService");

const getAllMembers = (req, res) => {
    try {
        const allMembers = discordService.getAllMembers();
        res.send({status: "OK", data: allMembers});
    } catch(error){
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

const getAllDiscordMembers = (req, res) => {
    try {
        const allDiscordMembers = discordService.getAllDiscordMembers();
        res.send({ status: "OK", data: allDiscordMembers});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllGithubMembers = (req, res) => {
    try {
        const allGithubMembers = discordService.getAllGithubMembers();
        res.send({ status: "OK", data: allGithubMembers});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneMember = (req, res) => {
    const {
        params: { memberId },
    } = req;

    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':memberId' can not be empty" },
            });
        return; 
    };

    try {
        const member = discordService.getOneMember(memberId);
        res.send({status: "OK", data: member});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewMember = (req, res) => {
    const { body } = req;

    if (
        !body.username ||
        !body.age ||
        !body.email ||
        !body.user_type
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "One of the following keys is missing or is empty in request body: 'username', 'age', 'email', 'user_type'",
                }
            })
        return;
    };

    const newMember = {
        username: body.username,
        age: body.age,
        email: body.email,
        user_type: body.user_type
    };

    try{
        const createdMember = discordService.createNewMember(newMember);
        res.status(201).send({ status: "OK", data: createdMember});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: {error: error?.message || error} });
    }

};

const updateOneMember = (req, res) => {
    const {
        body,
        params: { memberId }
    } = req;

    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':memberId' can not be empty" },
            });
        return; 
    };

    try {
        const updatedMember = discordService.updateOneMember(memberId, body);
        res.send({status: "OK", data: updatedMember});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

const deleteOneMember = (req, res) => {
    const {
        params: { memberId }
    } = req;

    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':memberId' can not be empty" },
            });
        return; 
    };

    try {
        discordService.deleteOneMember(memberId);
        res.status(204).send({status: "OK"});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

module.exports = {
    getAllMembers,
    getAllDiscordMembers,
    getAllGithubMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember
}
const DB = require("./db.json");

const {saveToDatabase} = require("./utils");

const DB_Student = require("../../config/models/Student");

const getAllMembers = () => {
    try {
        DB_Student.insertManyOne({username: "QUoc"});
        return DB_Student.find().json();
        return DB.members;
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getAllDiscordMembers = () => {
    try {
        return DB.members.filter((member) => member.user_type === "discord");
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getAllGithubMembers = () => {
    try {
        return DB.members.filter((member) => member.user_type === "github");
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getOneMember = (memberId) => {
    try {
        const member = DB.members.find((member) => member.id === memberId);
        if (!member){
            throw {
                status: 400,
                message: `Can't find member with this id '${memberId}'`,
              };
        }
        return member;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };        
    }    
};

const createNewMember = (newMember) => {
    try {
        const isAlreadyAdded = DB.members.findIndex((member) => member.username === newMember.username) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Member with the name '${newMember.name}' already exists`,
            };
        }

        DB.members.push(newMember);
        saveToDatabase(DB);

        //DB_Student.insertOne(newMember);
        return newMember;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updatedMember = (memberId, changes) => {
    try {
        const indexForUpdate = DB.members.findIndex((member) => member.id === memberId);

        if (indexForUpdate === -1){
            throw {
                status: 400,
                message: `Can't find member with the id '${memberId}'`,
              };
        }

        const updatedMember = {
            ...DB.members[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        }

        DB.members[indexForUpdate] = updatedMember;
        saveToDatabase(DB);
        return updatedMember;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteOneMember = (memberId) => {
    try {
        const indexForDeletion = DB.members.findIndex((member) => member.id === memberId);

        if (indexForDeletion === -1){
            throw {
                status: 400,
                message: `Can't find member with the id '${memberId}'`,
              };
        }
        DB.members.splice(indexForDeletion,1);
        saveToDatabase(DB);

        
        //DB_Student.deleteOne({id: memberId});
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };        
    }
};

module.exports = {
    getAllMembers,
    getAllDiscordMembers,
    getAllGithubMembers,
    getOneMember,
    createNewMember,
    updatedMember,
    deleteOneMember
}
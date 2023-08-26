const {Op} = require("sequelize");
const { Message,User,Multimedia,Conversation } = require('../models');


const createMessage = async (req,res)=>{
    try {

        const {body}= req

        let chat = await findChat(body.SENDER_ID,body.RECEIVER_ID);

        if(!chat){
            chat = await createdChat(body.SENDER_ID,body.RECEIVER_ID);
           
        }

        // const status =await statusUser(body.RECEIVER_ID);
        // if(status){
        //     console.log({messagge:"Enviar correo"})
            
        // }
        
        const message = {
            ID_CONVERSATION: chat.ID_CONVERSATION,
            SENDER_ID:body.SENDER_ID,
            RECEIVER_ID:body.RECEIVER_ID,
            CONTENT: body.CONTENT
        }
       
        const newMessage = await Message.create(message);
        if(chat.USER_N_MESSAGE == body.RECEIVER_ID){
            chat.STATE += 1
        }else{
            let USER_N_MESSAGE = chat.USER_N_MESSAGE || body.RECEIVER_ID
            await changeStateMessage(USER_N_MESSAGE,chat.ID_CONVERSATION)
            chat.STATE =1
        }
        chat.USER_N_MESSAGE = body.RECEIVER_ID
        await chat.save();

        
        res.status(200).json({messagge:newMessage,chat});
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})

    }
}
// ===============================================================
// funciones controlador crear mensajes
// ===============================================================
async function changeStateMessage(USER_N_MESSAGE,ID_CONVERSATION){
    const message = await Message.findOne({
        where:{
            [Op.and]:[
                {SENDER_ID:USER_N_MESSAGE},{ID_CONVERSATION}
            ]
        }
    })

    // message.STATE="seen"
    // await message.save();
}

async function findChat(USER_1_ID,USER_2_ID){
    return await Conversation.findOne({
        where:{
            [Op.or]:[
                {
                    [Op.and]:[
                        {USER_1_ID:USER_1_ID},
                        {USER_2_ID:USER_2_ID}
                    ]
                },
                {
                    [Op.and]:[
                        {USER_1_ID:USER_2_ID},
                        {USER_2_ID:USER_1_ID}
                    ]
                },
                
            ]
            
        }
    })
}

async function createdChat(USER_1_ID, USER_2_ID){
     return await Conversation.create({USER_1_ID,USER_2_ID})
    
}

async function statusUser(receiverID){
    const user = await User.findOne({
        where:{
            ID_USER:receiverID
        }
    })

    return (user.dataValues.ONLINE_STATUS === 'offline') ? true:false
}

// ===============================================================
// 
// ===============================================================
const getMessagesChat = async (req,res)=>{
    try {
        const {id_conversation} = req.params
        const page = parseInt(req.params.page); //número de página de los parámetros de consulta
        const limit =  parseInt(req.params.limit) ||15; // tamaño de página de los parámetros de consulta
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};

        const data = await Message.findAll(
            {
                where:{
                    ID_CONVERSATION:id_conversation
                },
                order:[
                    ["createdAt","DESC"]
                ],include:{model:User,as:"user",attributes:["ACCOUNT_NUMBER","NAME","ONLINE_STATUS","ID_USER"],include:[{model:Multimedia, as:"multimedia"}]}
            }
        )


        if (endIndex < data.length) {
            results.next = {
            page: page + 1,
            limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
            page: page - 1,
            limit: limit
            };
        }

        results.results = data.slice(startIndex, endIndex);
        res.json({results});
    
    } catch (error) {
        console.log({error});
        res.status(500).json({messagge:"Algo salio mal"})
    }
}



module.exports = {
    createMessage,
    getMessagesChat
};

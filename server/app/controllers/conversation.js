const { Conversation,User,Multimedia, Message } = require('../models');
const {Op} = require("sequelize");

const createdChat = async (req,res)=>{
    
    try {
        const {body} = req
       
        const conversation = await Conversation.findOne({
            where:{
                [Op.or]:[
                    {
                        [Op.and]:[
                            {USER_1_ID:body.USER_1_ID},
                            {USER_2_ID:body.USER_2_ID}
                        ]
                    },
                    {
                        [Op.and]:[
                            {USER_1_ID:body.USER_2_ID},
                            {USER_2_ID:body.USER_1_ID}
                        ]
                    },
                    
                ]
                
            }
        })

        if(conversation !== null){
            // const chat = await Message.findAll({
            //     where:{
            //         ID_CONVERSATION:conversation.dataValues.ID_CONVERSATION
            //     },order:[["createdAt","DESC"]]
            // })
            // if (endIndex < chat.length) {
            //     results.next = {
            //     page: page + 1,
            //     limit: limit
            //     };
            // }
    
            // if (startIndex > 0) {
            //     results.previous = {
            //     page: page - 1,
            //     limit: limit
            //     };
            // }
            // results.results = chat.slice(startIndex, endIndex);
            res.status(200).json({messagge:"ya existe un chat", idChat:conversation.dataValues.ID_CONVERSATION})
            return


        }



        const savedConversation = await Conversation.create(body)
        res.json({savedConversation});
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}

const getConversations = async (req,res)=>{
    try {
        const {id} = req.params
        const page = parseInt(req.params.page); // Obtén el número de página de los parámetros de consulta
        const limit =  parseInt(req.params.limit) || 10; // Obtén el tamaño de página de los parámetros de consulta
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};

        let data = await Conversation.findAll(
            {
                where:{
                    [Op.or]:
                        [{USER_1_ID:id},
                        {USER_2_ID:id}]
                },include:[{model:User,as:"user1",attributes:["ACCOUNT_NUMBER","NAME","ONLINE_STATUS","ID_USER"],include:[{model:Multimedia, as:"multimedia"}]},{model:User,as:"user2",attributes:["ACCOUNT_NUMBER","NAME","ONLINE_STATUS","ID_USER"],include:[{model:Multimedia, as:"multimedia"}]}]
            }
        )

      

        data = await data.map(item => {
            item = item.dataValues
            if (item.user1.ID_USER == parseInt(id)) {
              delete item.user1;
              item.USER_ = item.user2
              delete item.user2;
              return item;
            }
            else if (item.user2.ID_USER == parseInt(id)) {
                
              delete item.user2;
              item.USER_ = item.user1
              delete item.user1;
              return item;
            }
            
          });
          
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

const searchChats = async (req, res) => {
    try {
        
        const { query } = req;
        const keyword = query.keyword || ''; 
        const page = parseInt(query.page);
        const limit = 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        

        // Lógica de búsqueda de chats
          const data = await User.findAll({
            where: {
              [Op.or]: [
                { ACCOUNT_NUMBER: { [Op.like]: `%${keyword}%` } },
                { NAME: { [Op.like]: `%${keyword}%` } },
              ],
            },attributes:["ACCOUNT_NUMBER","ID_USER","NAME","ONLINE_STATUS"],
            include:[{model:Conversation},{model:Multimedia, as:"multimedia"}],
          });


        
        

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
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    createdChat,
    getConversations,
    searchChats
};

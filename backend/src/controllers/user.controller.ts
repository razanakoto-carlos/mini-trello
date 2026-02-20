import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

interface userParam{
    id:string;
}

//async function for all user
export async function getUsers(req:Request,res:Response){
    try{
        const users = await prisma.user.findMany();
        return res.json(users);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"})
    }
}

//async for only user
export async function getUser(req:Request<userParam>,res:Response){
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({error:"Invalid ID"});

        const user = await prisma.user.findUnique({where:{id}});

        return res.json(user)
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
}

//async for update
export async function updateUser(req:Request<userParam>,res:Response){
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)) return res.status(400).json({error:"Invalid ID"});

        const {name,password,email} = req.body;
        const user = await prisma.user.update({
            where:{id},
            data:{name,password,email}
        });

        return res.json(user);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
}

//async for delete
export async function deleteUser(req:Request<userParam>,res:Response){
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)) return res.status(400).json({error:"Invalid ID"});

        const user = await prisma.user.delete({where:{id}});
        return res.json(user);
    }catch{
        return res.status(500).json({error:"Something went wrong"});
    }
}
    
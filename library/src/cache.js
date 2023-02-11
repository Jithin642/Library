import redis from "./redis";

const fetch = async (key ,fetcher,expires)=>{

    return await set(key,fetcher,expires);
}

const set= async(key,fetcher,expires)=>{

    const value=await fetcher();
    console.log(value);
    await redis.set(key,JSON.stringify(value),"EX", expires);
    return value;

}

export {fetch, set}
import { useState } from "react";
import { User } from "../../trans/user";
import { Reg } from "../../trans/req/reqF";


// Registration 
export function useRegistration() {
    
    const reg = async (valueInp, valuePas) => {
        const userV = {
            login: valueInp,
            password: valuePas,
        };

        const user = new User();
        user.set(userV);
        const data = await Reg(user.get());
        return data.status !== 200;
    };

    return {
        reg,
    };
}
import { Auth } from "../../trans/req/reqF";
import { useDispatcher } from "../store";
import { User } from "../../trans/user";


// Authorization  
export function useAuthorization() {
    const setRoleUser = useDispatcher("role");
    const setRoleAdmin = useDispatcher("role");
    const setLogin = useDispatcher("login");
    /* редакс
          const dispatch = useDispatch();
      
          const setRoleUser = () => {
              dispatch({type: "setRole", payload: "user"})
          }
      
          const setRoleAdmin = () => {
              dispatch({type: "setRole", payload: "admin"})
          }
      
          const setLogin = (login) => {
              dispatch({type: "setLogin", payload: login})
          }
      
       */

    const auth = async (valueInp, valuePas) => {
        const userV = {
            login: valueInp,
            password: valuePas,
        };

        const user = new User();
        user.set(userV);
        const data = await Auth(user.get());
        if (data.status === 200) {
            localStorage.setItem("token", data.data_.token);
            const a = data.data_.token.split(".");
            const b = JSON.parse(atob(a[1]));
            setLogin(b.login);
            return { result: false, role: b.role };
        } else {
            return { result: true, role: "" };
        }
    };
    return {
        auth,
        setRoleUser,
        setRoleAdmin,
    };
}
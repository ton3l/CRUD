import type { Username } from "../types/user";

class UserService {
    private url = import.meta.env.VITE_API_URL + 'usernames';
    
    constructor () {}

    getUsers(): Promise<Array<Username>>{
        const users = fetch(this.url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ) // eslint-disable-next-line
        .then(response => response.json() as Promise<Array<Username>>);

        return users;
    }
}

export default new UserService();
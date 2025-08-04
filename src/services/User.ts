import type { User } from "../types/user";

class UserService {
    private url = import.meta.env.VITE_API_URL + 'usernames';
    
    constructor () {}

    createUser(username: string): void {
        if (!username) throw new Error('Username cannot be empty');

        fetch(this.url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username })
            }
        );
    }

    getUsers(): Promise<Array<User>>{
        const users = fetch(this.url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ) // eslint-disable-next-line
        .then(response => response.json() as Promise<Array<User>>);

        return users;
    }

    updateUser(id: number, newUsername: string): void {
        if (!id || !newUsername) throw new Error('Username or Id cannot be empty');

        fetch(`${this.url}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newUsername })
            }
        );
    }

    deleteUser(id: number): void {
        if (!id) throw new Error('Id cannot be empty');

        fetch(`${this.url}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

export default new UserService();
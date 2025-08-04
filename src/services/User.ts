import type { User } from "../types/user";

class UserService {
    private url = import.meta.env.VITE_API_URL + 'usernames';
    
    constructor () {}

    async createUser(username: string): Promise<void> {
        if (!username) throw new Error('Username cannot be empty');

        await fetch(this.url,
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

    async updateUser(id: number, newUsername: string): Promise<void> {
        if (!id || !newUsername) throw new Error('Username or Id cannot be empty');

        await fetch(`${this.url}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newUsername })
            }
        );
    }

    async deleteUser(id: number): Promise<void> {
        if (!id) throw new Error('Id cannot be empty');

        await fetch(`${this.url}/${id}`,
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
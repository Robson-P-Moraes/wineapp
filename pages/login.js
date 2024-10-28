import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../utils/auth";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login (username, password);
        if (response.token){
            router.push('/add-wine'); // Redirecionar para a página de adicionar vinho
        } else {
            alert('Credenciais Inválidas!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome do Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit"> Login</button>
        </form>
    );
}
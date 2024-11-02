// Página de exibição dos vinhos

import { useEffect, useState } from "react";
import {isAuthenticated} from '../utils/auth';
import { useRouter } from "next/router";

export default function WineAhelf() {
    const [wines, setWines] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()){
            router.push('/login');
            return;
        }

        const fetWines = async() => {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/wines', {
                headers: {'Authorization': `Bearer ${token}`},
            });
            const data = await response.json();
            setWines(data);
        };

        fetchWines();
    }, []);

    return (
        <div>
            <h1>Minha coleção de Vinhos</h1>

            <ul>
                {wines.map((wine) => (
                    <li key={wine._id}>
                        <h2>{wine.name}</h2>
                        <p>{wine.type} - {wine.year}</p>
                        <p>Melhor ano para consumo: {wine.bestYearToConsume}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
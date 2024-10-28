// Página para Adicionar Vinho

import {useState} from 'react';

export default function AddWine() {
    const [form, setForm] = useState({name: '', year: '', type: '', bestYearToConsume: '', imageUrl: ''});

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/wines/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(form),
            });
            if (response.ok) alert('Vinho adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar vinho!', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nome" onChange={handleChange} />
            <input name='year' placeholder='Ano de Produção' onChange={handleChange} />
            <input name='type' placeholder='Tipo' onChange={handleChange} />
            <input name='bestYearToConsume' placeholder='Melhor Ano para Consumo' onChange={handleChange} />
            <input name='imageUrl' placeholder='Link da Imagem' onChange={handleChange} />
            <button type='submit'>Adicionar Vinho</button>
        </form>
    );
}
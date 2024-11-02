// Funções de login, logout e verificação de autenticação

export const login = async(username, password) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });
    const data = await response.json();
    if (response.ok){
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const logout = () => {
    return !!localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
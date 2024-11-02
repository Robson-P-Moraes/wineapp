import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  const handleAddWine = () => {
    router.push('/add-wine'); // Redireciona para a página de adicionar vinho
  };

  const handleViewCollection = () => {
    router.push('/collection'); // Redireciona para a coleção de vinhos
  };

  const handleLogout = () => {
    // Opcionalmente, limpe o token do usuário ou faça logout de outra maneira
    router.push('/login'); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Bem-vindo à sua estante de vinhos!</h2>
      <button onClick={handleAddWine}>Adicionar Novo Vinho</button>
      <button onClick={handleViewCollection}>Ver Coleção</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

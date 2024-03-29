import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = api.post('repositories', {
      title: 'Novo repositório'
    });
    const repository = (await response).data;
    
    setRepositories([...repositories, repository])
  }

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  }, []);

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      console.log(response);
    });

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button> </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

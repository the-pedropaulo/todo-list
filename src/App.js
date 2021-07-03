import './App.css'
import { useState, useEffect } from 'react'


function App() {


  
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
      setModal(!modal)
    };
  
  const [tarefas, setTarefas] = useState([]);
  
  const salvarTarefa = () => {
    
    let novaTarefa = document.getElementById("content-tarefa")
    setTarefas([
      ...tarefas,  
        {
          id: new Date().getTime(),
          mensagem: novaTarefa.value,
          finalizada: false
        },   
    ])
    window.localStorage.setItem('mensagens:tarefas', JSON.stringify([...tarefas,  
      {
        id: new Date().getTime(),
        mensagem: novaTarefa.value,
        finalizada: false
      },   
    ]))

    setModal(false)
  };

  const marcarConcluido = (id) => {
    
    let tarefasAtualizadas = tarefas.filter((tarefa) => {
      if(tarefa.id === id) {
        tarefa.finalizada=!tarefa.finalizada
      }
      return tarefa
    })

    setTarefas(tarefasAtualizadas)
    window.localStorage.setItem('mensagens:tarefas', JSON.stringify(tarefasAtualizadas))
  };

  const excluirTarefa = (id) => {
    
    let tarefasAtualizadas = tarefas.filter((tarefa) => {
      if(tarefa.id != id) {
        return tarefa
      }
    })

    setTarefas(tarefasAtualizadas)
    window.localStorage.setItem('mensagens:tarefas', JSON.stringify(tarefasAtualizadas))
  }

  useEffect(() => {
    if(window.localStorage.getItem('mensagens:tarefas') != undefined) {
      setTarefas(JSON.parse(window.localStorage.getItem('mensagens:tarefas')))
    } 
  }, []);
  
  return (
    <div>
        
        {
          modal && 
          <div className="modal">
              <div className="modalContent">
                  <div className="modalContentHigh">
                    <h3>Adicione sua tarefa</h3>
                    <span onClick={() => abrirModal()}>X</span>
                  </div>  
                  <div className="modalContentLow">
                      <input type="text" id="content-tarefa" placeholder="Digite sua tarefa"></input>
                      <button onClick={() => salvarTarefa()}>Salvar</button>
                  </div>
              </div>      
          </div>
        }
        
        <div className="addTarefa" onClick={() => abrirModal()}>+</div>

        <div className="boxTarefas">
          <h2> Minhas tarefas do dia </h2>
              {
                tarefas.map((tarefa) => {
                    if(!tarefa.finalizada) {
                      return (
                        <div>
                          <p onClick={() => marcarConcluido(tarefa.id)}> {tarefa.mensagem} </p>
                          <div className="button-lixo" onClick={() => excluirTarefa(tarefa.id)}>X</div>
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <p style={{textDecoration:'line-through'}} onClick={() => marcarConcluido(tarefa.id)}> {tarefa.mensagem}</p>
                          <div className="button-lixo">X</div>
                        </div>  
                      )
                    }
                })
              }
        </div>
    </div>
  );
}

export default App;

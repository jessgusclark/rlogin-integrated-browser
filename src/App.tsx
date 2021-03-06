import React, { useState } from 'react'
import './App.scss'
import { rLogin } from './rLogin'
import Eth from 'ethjs-query'

function App () {
  const [response, setResponse] = useState<any>(null)
  interface logItem {
    id: number
    text: string,
  }

  const [log, setLog] = useState<logItem[]>([{ id: 0, text: 'Startup' }])
  const [account, setAccount] = useState<string>('')
  const [chainId, setChainId] = useState<number>(0)

  const logIt = (text: string) => setLog([...log, { text, id: log.length }])

  const handleConnect = () => {
    logIt('connecting...')
    rLogin.connect()
      .then((response: any) => {
        logIt('Connected!')
        const ethQuery = new Eth(response.provider)
        ethQuery.accounts().then((accounts: string[]) => setAccount(accounts[0]))
        ethQuery.net_version().then((id: number) => setChainId(id))

        setResponse(response)
      })
      .catch((err: Error) => logIt(err.toString()))
  }

  const handleDisconnect = () => {
    response.disconnect()
    setResponse(null)
    logIt('Disconnect.')
  }

  return (
    <div className="App">
      <header className="App-header">
        Testing rLogin Integrated!
      </header>

      <div className="interaction">
        <h2>Start here!</h2>
        <button onClick={handleConnect}>Connect ;-)</button>
        <button onClick={() => localStorage.clear()}>Clear Local Storage</button>

        {response && (
          <>
            <button onClick={handleDisconnect}>Disconnect</button>
            <p>Address: {account}</p>
            <p>ChainId: {chainId}</p>
          </>
        )}
      </div>

      <div className="log">
        <h2>Log:</h2>
        <ol>
          {log.map((item: logItem) => <li key={item.id}>{item.text}</li>)}
        </ol>
      </div>
      <footer>
        Published version: 2
      </footer>
    </div>
  )
}

export default App

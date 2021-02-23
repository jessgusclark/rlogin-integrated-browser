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
      .then((response: any) => afterConnect(response))
      .catch((err: Error) => logIt(err.toString()))
  }

  const handleInjectConnect = () => {
    logIt('connecting Injected...')
    rLogin.connectTo('injected')
      .then((response: any) => afterConnect(response))
      .catch((err: Error) => logIt(err.toString()))
  }

  const afterConnect = (response: any) => {
    logIt('Connected!')

    const ethQuery = new Eth(response.provider)
    ethQuery.accounts()
      .then((accounts: string[]) => setAccount(accounts[0]))
      .catch((err: Error) => logIt(`Error Account: ${err.message}`))

    ethQuery.net_version()
      .then((id: number) => setChainId(id))
      .catch((err: Error) => logIt(`Error ChainId: ${err.message}`))

    setResponse(response)
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
        <button onClick={handleInjectConnect}>Injected!</button>
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
        Published version: 5
      </footer>
    </div>
  )
}

export default App

import { useEffect, useState, useCallback, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRDSTUVWZYZacdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!#$%^&*()_+="

    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, setPassword, numberAllowed, passwordGenerator])

  //userRef hoook
  const passwordRef = useRef(null)

  const copyCipBoardPassword = useCallback(() => {
    window.navigator.clipboard?.writeText(password)
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, length)
  }, [password, charAllowed, length, numberAllowed])


  return (
    <>
      <img src="https://yt3.googleusercontent.com/1FEdfq3XpKE9UrkT4eOc5wLF2Bz-42sskTi0RkK4nPh4WqCbVmmrDZ5SVEV3WyvPdkfR8sw2=s176-c-k-c0x00ffffff-no-rj" alt="" style={{ borderRadius: "50%" }} />
      <p>Sir Hitesh Choudhary</p>
      <h4 style={{ textAlign: 'center' }}>Password Generator</h4>
      <br />
      <div className="input-group mb-3">
        <input type="text" value={password} className="form-control" placeholder="password generator" aria-label="Recipient's username" aria-describedby="button-addon2" readOnly ref={passwordRef} />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={copyCipBoardPassword}>Copy</button>
      </div>
      <div>
        <label htmlFor="customRange1" className="form-label">Length:{length}</label>
        <input type="range" value={length} className="form-range" id="customRange1" min={6} max={100} onChange={(e) => { setLength(e.target.value) }} />
        <div style={{ margin: '12px' }}>
          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" onChange={() => { setNumberAllowed((prev) => !prev) }} />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Numbers
          </label>
        </div>
        <div style={{ margin: '12px' }}>
          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" onChange={() => { setCharAllowed((prev) => !prev) }} />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Special Character
          </label>
        </div>
      </div>

      <div className="input-group mb-3">
        <input type="text"  className="form-control" placeholder="paste bin" aria-label="Recipient's username" aria-describedby="button-addon2" />
      </div>

    </>
  )
}

export default App

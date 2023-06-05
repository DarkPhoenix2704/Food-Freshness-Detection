import { useState } from "react"

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [fruit, setFruit] = useState<string | null>(null)
  const [freshness, setFreshness] = useState<string | null>(null)
  
  return (
    <div className='bg-[#ffffff] h-[100vh] flex flex-col gap-3 items-center justify-center'>
      <h1 className="text-5xl font-bold">Smart Fruit</h1>
      {
        file && (
          <img src={URL.createObjectURL(file)} alt="fruit" className="mt-4 w-3/4 md:w-96 rounded-md"/>
        )
      }
      <input type="file" className="mt-4 " onChange={(e) => {
        setFruit(null)
        setFreshness(null)
        if (e.target.files) {
          setFile(e.target.files[0])
        }
      }}/>
      <button className="bg-[#0f172a] text-xl px-2 py-2 rounded-md text-[#ffffff] hover:bg-[#334155]" onClick={() => {
        if (file) {
          const formData = new FormData()
          formData.append("file", file)
          fetch("http://localhost:5000", {
            method: "POST",
            body: formData
          }).then(res => res.json()).then(data => {
            const fruit = data.foodLabel.split("_")[1]
            const freshness = data.foodStatus
            setFruit(fruit)
            setFreshness(freshness)
          })
        }
      }}>
        Calculate Freshness
      </button>
      {
        fruit && (
          <>
          <h1 className="text-xl font-semibold mt-4">Fruit: {fruit}</h1>
          <h1 className="text-xl font-semibold">Freshness: {freshness}</h1>
          </>
        )
      }
    </div>
  )
}

export default App

import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import Swal from 'sweetalert2'
import { defaultCodes } from '../../lists'
import { outputInterface, problemInterface } from '../Interfaces/problem.interface'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import api from '../../utils/api'
import apiRoutes from '../../utils/Routes/apiRoutes'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface IDEPageInterface {
  problem: problemInterface
  email: string,
  name: string
}

interface runningOutputInterface {
  outputs: string[]
}

const runCode = async({code, language, inputs}:{code: string, language: string, inputs: string[]}): Promise<runningOutputInterface> => {
  const { data } = await api.post<runningOutputInterface>(apiRoutes.problems.runProblem, {
    code: code,
    language: language,
    inputs: inputs
  })
  return data;
}

const submitCode = async({code, language, email, name}: {code: string, language: string, email: string, name: string}): Promise<outputInterface> => {
  const { data } = await api.post<outputInterface>(apiRoutes.problems.submitCode, {
    name: name,
    email: email,
    code: code,
    language: language
  })
  return data;
}

const IDEPage: React.FC<IDEPageInterface> = ({ problem, email, name }) => {
  const [language, setLanguage] = useState('cpp')
  const [inputs, setInputs] = useState(problem?.realTestCases)
  const [currentNumber, setCurrentNumber] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState(localStorage.getItem('userCode') ? localStorage.getItem('userCode') : defaultCodes[language])
  const [content, setContent] = useState<'input' | 'output'>('input')
  const [providedOutputs, setProvidedOutputs] = useState<string[]>([]);
  const [Loading, setLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const handleCodeChange = (val: string | undefined) => {
    localStorage.setItem('userCode', val ?? '');
    setCode(val ?? '')
  }

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value
    const result = await Swal.fire({
      title: 'Change Programming Language?',
      text: 'Changing the language will clear the current code.',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: true,
    })

    if (result.isConfirmed) {
      setLanguage(selectedLanguage)
      setCode(defaultCodes[selectedLanguage])
    }
  }

  const {mutate: runCodeMutation} = useMutation({
    mutationFn: ({code, language, inputs, name}: {code: string, language: string, inputs: string[], name: string}) => runCode({code, language, inputs}),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLoading(false),
      setProvidedOutputs(data.outputs ?? [])
    },
    onError: () => {
      setLoading(false);
      toast.error("Something went wrong. Please try after some time");
    }
  })

  const{ mutate: submitCodeMutation } = useMutation({
    mutationFn: ({code, language, email}: {code: string, language: string, email: string}) => submitCode({code: code, language: language, email: email, name: name}),
    onMutate: () => setSubmissionLoading(true),
    onSuccess: async(data) => {
      setSubmissionLoading(false);
      localStorage.setItem("dailyProblemDate", JSON.stringify(new Date()))
      if(data.error == false){
        localStorage.setItem("dailyProblemStatus", "Accepted")
        await Swal.fire({
          title: 'Congratulations!',
          html: `
            <div class="text-lg">You have successfully solved today’s <strong>Daily Problem Challenge</strong>!<br><br></div>
            <div style="margin-bottom: 10px; display: flex; justify-content: center;">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" width="80" alt="Golden Coin" />
            </div>
            <div><strong>🔥 Streak:</strong> ${data.streak} day${data.streak > 1 ? 's' : ''}</div>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true,
          background: '#DBEAFE',
          backdrop: `
            rgba(255, 255, 255, 0.9)
          `,
          customClass: {
            popup: 'rounded-xl shadow-lg'
          }
        })
      }
      else{
        if(!localStorage.getItem("dailyProblemStatus") || !(localStorage.getItem("dailyProblemStatus") == "Accepted")){
          localStorage.setItem("dailyProblemStatus", "Rejected")
        }
        await Swal.fire({
          title: 'Code Execution Failed',
          html: `
            <div class="text-left">
              <p><strong>Error Type:</strong> ${data.errorType}</p>
              <p><strong>Message:</strong> ${data.errorMessage}</p>
            </div>
          `,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: true,
          background: '#FCA5A5',
          customClass: {
            popup: 'rounded-lg p-4',
            title: 'text-red-700 text-lg',
            htmlContainer: 'text-sm text-gray-800'
          },  
          showClass: {
            popup: 'animate__animated animate__shakeX'
          }
        });
      }
    },
    onError: () => {
      setSubmissionLoading(false);
      toast.error("Failed to Submit Code. Please try after some time")
    }
  })

  const handleUpdateInput = (value: string, index: number) => {
    const updatedInput = [...inputs];
    updatedInput[index] = {
      ...updatedInput[index],
      input: value,
    }
    setInputs(updatedInput)
  }
  const handleRunCode = () => {
    setIsOpen(true)
    setContent("output")
    runCodeMutation({code: code, language: language, inputs: inputs.map(val => val.input)});
  }
  const handleSubmitCode = () => {
    submitCodeMutation({code: code, language: language, email: email, name: name})
  }

  return (
    <div className="bg-black rounded-lg">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border rounded cursor-pointer bg-yellow-200 text-black"
          >
            {['c++', 'python', 'javascript', 'java', 'c', 'typescript', 'go', 'C#'].map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
          <div className="flex gap-4">
            <button onClick={handleRunCode} disabled={Loading || submissionLoading} className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition ${Loading ? "bg-green-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"} text-white`}
              title="Run Code">
              {Loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Running...
                </>
              ) : (
                "Run"
              )}
            </button>
            <button 
              onClick={handleSubmitCode} disabled={submissionLoading || Loading}
              className={`text-white px-6 py-2 rounded-lg transition flex justify-center items-center ${submissionLoading ? "cursor-not-allowed bg-red-500" : "bg-red-700 hover:bg-red-800"}`}
              title = "Submit Code"
            >
              {submissionLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting..
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>

        <CodeEditor language={language} code={code} onChange={handleCodeChange} isOpen={isOpen} />

        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="absolute left-[-1.2rem] top-[-0.9rem] text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition" title="Toggle Sample I/O">
                {isOpen ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
            </button>
        </div>

        {isOpen && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <div className="flex gap-6 mb-4">
              <button
                className={`px-4 py-1 rounded-lg text-sm font-medium ${
                  content === 'input' ? 'bg-slate-600 text-white' : 'bg-black text-white'
                }`}
                onClick={() => setContent('input')}
              >
                Input
              </button>
              <button
                className={`px-4 py-1 rounded-lg text-sm font-medium ${
                  content === 'output' ? 'bg-slate-600 text-white' : 'bg-black text-white'
                }`}
                onClick={() => setContent('output')}
              >
                Output
              </button>
            </div>

            <div className="flex gap-4">
              {inputs && inputs.map((val, index) => (
                <div key={index} className="w-full">
                  <div className={`cursor-pointer px-4 py-2 rounded-t-md text-sm font-semibold ${currentNumber === index ? 'bg-gray-300 text-black' : 'bg-gray-600 text-white'}`}
                    onClick={() => setCurrentNumber(index)}>
                    <div className="flex justify-between">
                      <div className="">Sample Test Case {index + 1}</div>
                      <div className={`${providedOutputs.length > 0 && !Loading ? '' : 'hidden'}`}>{
                        val.output == providedOutputs[index] ? <span className='text-green-900'>Accepted</span> : <span className='text-red-900'>Rejected</span>  
                      }</div>
                    </div>
                  </div>
                  {content == 'input' && (
                    <div className={`bg-gray-400 p-3 rounded-b-md ${currentNumber === index ? '' : 'hidden'}`}>
                      <input type="text" value={val.input} className='w-full bg-gray-400' onChange={(e) => handleUpdateInput(e.target.value, index)}/>
                    </div>
                  )}
                  {!Loading && content == 'output' && (
                    <div className={`bg-gray-400 text-black p-3 rounded-b-md ${currentNumber === index ? '' : 'hidden'}`}>
                      <div className="flex justify-between">
                        <div className="">
                          <span className='text-black font-semibold mr-2'>Expected Output: </span>{val.output}
                        </div>
                        <div className={`${providedOutputs.length > 0 ? '' : 'hidden'}`}>
                          <span className='text-black font-semibold mr-2'>Your Output: </span>{providedOutputs[index]}
                        </div>
                      </div>
                    </div>
                  )}
                  {Loading && (
                    <div className="text-gray-600 mt-2 flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Processing code...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IDEPage
function confetti(arg0: { particleCount: number; spread: number; origin: { y: number } }) {
  throw new Error('Function not implemented.')
}


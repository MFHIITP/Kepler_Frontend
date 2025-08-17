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
import { Play, Send, Code, Terminal, CheckCircle, XCircle, Loader2, Settings, ChevronDown, ChevronUp } from 'lucide-react'

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
      localStorage.removeItem("userCode");
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
            <div class="text-lg">You have successfully solved today's <strong>Daily Problem Challenge</strong>!<br><br></div>
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

  const getLanguageColor = (lang: string) => {
    const colors = {
      'cpp': 'from-blue-500 to-cyan-500',
      'c++': 'from-blue-500 to-cyan-500',
      'python': 'from-green-500 to-emerald-500',
      'javascript': 'from-yellow-500 to-orange-500',
      'typescript': 'from-blue-600 to-indigo-500',
      'java': 'from-red-500 to-orange-500',
      'c': 'from-gray-600 to-slate-500',
      'go': 'from-cyan-500 to-teal-500',
      'C#': 'from-purple-500 to-violet-500'
    };
    return colors[lang] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-b border-white/10 p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Language:</span>
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={handleLanguageChange}
                className={`appearance-none bg-gradient-to-r ${getLanguageColor(language)} text-white px-4 py-2 pr-8 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              >
                {['cpp', 'python', 'javascript', 'java', 'c', 'typescript', 'go', 'C#'].map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-800 text-white">{lang.toUpperCase()}</option>
                ))}
              </select>
              <Settings className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRunCode} 
              disabled={Loading || submissionLoading} 
              className={`group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                Loading 
                  ? "bg-gradient-to-r from-green-400 to-emerald-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:scale-105 active:scale-95"
              }`}
            >
              <div className="flex items-center space-x-2">
                {Loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run</span>
                  </>
                )}
              </div>
              {!Loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>

            <button 
              onClick={handleSubmitCode} 
              disabled={submissionLoading || Loading}
              className={`group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                submissionLoading 
                  ? "bg-gradient-to-r from-red-400 to-rose-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 hover:shadow-lg hover:scale-105 active:scale-95"
              }`}
            >
              <div className="flex items-center space-x-2">
                {submissionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </div>
              {!submissionLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="p-6">
        <div className="relative">
          <CodeEditor language={language} code={code} onChange={handleCodeChange} isOpen={isOpen} />
          
          {/* Toggle Button */}
          <div className="absolute -bottom-4 left-4 z-10">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="group bg-gradient-to-r from-gray-700 to-slate-700 hover:from-gray-600 hover:to-slate-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-white/10"
              title="Toggle Test Cases"
            >
              <div className="flex items-center space-x-2">
                {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                <Terminal className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Test Cases Panel */}
        {isOpen && (
          <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-slate-800/50 rounded-2xl border border-white/10 overflow-hidden">
            {/* Panel Header */}
            <div className="bg-gradient-to-r from-gray-700/30 to-slate-700/30 border-b border-white/10 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Test Cases</span>
                </div>
                
                <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      content === 'input' 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setContent('input')}
                  >
                    Input
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      content === 'output' 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setContent('output')}
                  >
                    Output
                  </button>
                </div>
              </div>
            </div>

            {/* Test Cases Content */}
            <div className="p-6">
              <div className="grid gap-4">
                {inputs && inputs.map((val, index) => (
                  <div key={index} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200">
                    {/* Test Case Header */}
                    <div 
                      className={`cursor-pointer px-6 py-4 border-b border-white/10 transition-all duration-200 ${
                        currentNumber === index 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setCurrentNumber(index)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${currentNumber === index ? 'bg-blue-400' : 'bg-gray-500'}`}></div>
                          <span className="text-white font-medium">Test Case {index + 1}</span>
                        </div>
                        {providedOutputs.length > 0 && !Loading && (
                          <div className="flex items-center space-x-2">
                            {val.output == providedOutputs[index] ? (
                              <div className="flex items-center space-x-2 text-emerald-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-semibold">Passed</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span className="font-semibold">Failed</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Test Case Content */}
                    {currentNumber === index && (
                      <div className="p-6">
                        {content === 'input' && (
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-300">Input:</label>
                            <input 
                              type="text" 
                              value={val.input} 
                              onChange={(e) => handleUpdateInput(e.target.value, index)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                              placeholder="Enter test input..."
                            />
                          </div>
                        )}

                        {content === 'output' && !Loading && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-emerald-300">Expected Output:</label>
                                <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-100 font-mono">
                                  {val.output}
                                </div>
                              </div>
                              {providedOutputs.length > 0 && (
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-blue-300">Your Output:</label>
                                  <div className={`px-4 py-3 rounded-lg font-mono border ${
                                    val.output == providedOutputs[index] 
                                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100' 
                                      : 'bg-red-500/10 border-red-500/20 text-red-100'
                                  }`}>
                                    {providedOutputs[index]}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {Loading && (
                          <div className="flex items-center justify-center py-8">
                            <div className="flex items-center space-x-3 text-blue-400">
                              <Loader2 className="w-6 h-6 animate-spin" />
                              <span className="text-lg font-medium">Processing your code...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IDEPage
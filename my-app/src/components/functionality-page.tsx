'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, PlusCircle, Globe, Book, Landmark, MapPin, Compass, Bus, Globe2 } from "lucide-react"
import Link from "next/link"

export function FunctionalityPage() {
  const initialFormData = {
    country: '',
    cities: [''],
    departureDate: null,
    returnDate: null,
    travelerType: '',
    interests: [],
    learningTime: '',
    knowledgeLevel: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [jsonOutputs, setJsonOutputs] = useState([])
  const [showStartLearningModal, setShowStartLearningModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === 'city') {
      setFormData(prev => ({
        ...prev,
        cities: prev.cities.map((city, i) => i === index ? value : city)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }))
  }

  const addCity = () => {
    setFormData(prev => ({
      ...prev,
      cities: [...prev.cities, '']
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const outputs = formData.cities.filter(city => city).map(city => {
      const cityData = { ...formData, city }
      delete cityData.cities
      return JSON.stringify(cityData, null, 2)
    })
    setJsonOutputs(outputs)
    console.log(outputs)
    setShowStartLearningModal(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setJsonOutputs([])
    setShowDashboard(false)
    setSelectedModule(null)
    setSelectedTask(null)
  }

  const getTaskIcon = (taskTitle) => {
    if (taskTitle.includes("Language")) return <Globe2 className="h-6 w-6 mb-2" />
    if (taskTitle.includes("culture")) return <Globe className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Legal")) return <Book className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Historical")) return <Landmark className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Nature")) return <MapPin className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Transportation")) return <Bus className="h-6 w-6 mb-2" />
    return <Compass className="h-6 w-6 mb-2" />
  }

  const Dashboard = ({ formData }) => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedModule, setSelectedModule] = useState(null)
    const [modules, setModules] = useState(() => {
      const countryInterests = ["Language basics"]
      const cityInterests = [
        "Local culture and customs",
        "Legal and safety tips",
        "Historical sites and landmarks",
        "Nature and outdoor activities",
        "Transportation and logistics"
      ]

      const generateModules = (location, interests) => {
        return interests.filter(interest => formData.interests.includes(interest)).map(interest => ({
          id: `${interest}-${location}`,
          title: `${interest} in ${location}`,
          status: "To Do"
        }))
      }

      const countryModules = {
        title: formData.country,
        modules: generateModules(formData.country, countryInterests),
        progress: 0
      }

      const cityModules = formData.cities.filter(city => city).map(city => ({
        title: city,
        modules: generateModules(city, cityInterests),
        progress: 0
      }))

      return {
        country: countryModules,
        cities: cityModules
      }
    })

    const updateModuleStatus = (moduleType, moduleIndex, taskId, newStatus) => {
      setModules(prevModules => {
        const updatedModules = JSON.parse(JSON.stringify(prevModules))
        if (moduleType === 'country') {
          const taskIndex = updatedModules.country.modules.findIndex(m => m.id === taskId)
          if (taskIndex !== -1) {
            updatedModules.country.modules[taskIndex].status = newStatus
          }
          updatedModules.country.progress = calculateProgress(updatedModules.country.modules)
        } else {
          const taskIndex = updatedModules.cities[moduleIndex].modules.findIndex(m => m.id === taskId)
          if (taskIndex !== -1) {
            updatedModules.cities[moduleIndex].modules[taskIndex].status = newStatus
          }
          updatedModules.cities[moduleIndex].progress = calculateProgress(updatedModules.cities[moduleIndex].modules)
        }
        return updatedModules
      })
    }

    const calculateProgress = (modules) => {
      const totalTasks = modules.length
      const completedTasks = modules.filter(m => m.status === 'Done').length
      return Math.round((completedTasks / totalTasks) * 100)
    }

    const JiraBoard = ({ modules, moduleType, moduleIndex, setSelectedTask, updateModuleStatus }) => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {["To Do", "In Progress", "Done"].map(status => (
          <Card key={status} className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>{status}</CardTitle>
            </CardHeader>
            <CardContent>
              {modules.filter(module => module.status === status).map(module => (
                <div
                  key={module.id}
                  className="mb-2 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    setSelectedTask({ ...module, moduleType, moduleIndex })
                  }}
                >
                  <div className="flex flex-col items-center">
                    {getTaskIcon(module.title)}
                    {module.title}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Nellie
            </Link>
            {selectedModule ? (
              <Button
                onClick={() => setSelectedModule(null)}
                variant="outline"
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            ) : (
              <Button onClick={resetForm} variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Form
              </Button>
            )}
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Your Learning Journey</h1>
          {selectedModule ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedModule.title}</h2>
              <JiraBoard
                modules={
                  selectedModule.type === 'country'
                    ? modules.country.modules
                    : modules.cities[selectedModule.index].modules
                }
                moduleType={selectedModule.type}
                moduleIndex={selectedModule.index}
                setSelectedTask={setSelectedTask}
                updateModuleStatus={updateModuleStatus}
              />
            </>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center">
                <Card
                  className="bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors w-64"
                  onClick={() => setSelectedModule({ title: modules.country.title, type: 'country', index: 0 })}
                >
                  <CardHeader>
                    <CardTitle className="text-center">{modules.country.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={modules.country.progress} className="w-full" />
                    <p className="text-center mt-2">{modules.country.progress}% Complete</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {modules.cities.map((city, index) => (
                  <Card
                    key={city.title}
                    className="bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors w-64"
                    onClick={() => setSelectedModule({ title: city.title, type: 'city', index })}
                  >
                    <CardHeader>
                      <CardTitle className="text-center">{city.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={city.progress} className="w-full" />
                      <p className="text-center mt-2">{city.progress}% Complete</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask?.title}</DialogTitle>
            </DialogHeader>
            <p className="text-center text-lg text-gray-700">
              {selectedTask?.status === 'Done' ? 'This task is completed!' : 'What would you like to do with this task?'}
            </p>
            <p className="text-center text-lg text-gray-700 mt-2">Content for {selectedTask?.title} here</p>
            <DialogFooter>
              {selectedTask?.status !== 'Done' && (
                <>
                  {selectedTask?.status === 'To Do' && (
                    <Button
                      onClick={() => {
                        updateModuleStatus(selectedTask.moduleType, selectedTask.moduleIndex, selectedTask.id, 'In Progress')
                        setSelectedTask(null)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Mark as In Progress
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      updateModuleStatus(selectedTask.moduleType, selectedTask.moduleIndex, selectedTask.id, 'Done')
                      setSelectedTask(null)
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Mark as Done
                  </Button>
                </>
              )}
              <Button onClick={() => setSelectedTask(null)} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (showDashboard) {
    return <Dashboard formData={formData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-start">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Nellie
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Plan Your Journey</h1>
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div>
            <Label htmlFor="country" className="text-lg font-semibold text-indigo-700">What country are you traveling to?</Label>
            <Input
              id="country"
              name="country"
              placeholder="Enter country name"
              value={formData.country}
              onChange={(e) => handleInputChange(e)}
              className="mt-2"
            />
          </div>

          <div className="mt-4 space-y-4">
            <Label className="text-lg font-semibold text-indigo-700">What cities are you traveling to?</Label>
            {formData.cities.map((city, index) => (
              <Input
                key={index}
                name="city"
                placeholder={`Enter city ${index + 1}`}
                value={city}
                onChange={(e) => handleInputChange(e, index)}
                className="mt-2"
              />
            ))}
            <Button type="button" onClick={addCity} className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Another City
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label  htmlFor="departureDate" className="text-lg font-semibold text-indigo-700">When are you leaving?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.departureDate}
                    onSelect={(date) => handleDateChange('departureDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="returnDate" className="text-lg font-semibold text-indigo-700">When are you coming back?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.returnDate ? format(formData.returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.returnDate}
                    onSelect={(date) => handleDateChange('returnDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold text-indigo-700">What type of traveler are you?</Label>
            <RadioGroup onValueChange={(value) => setFormData(prev => ({ ...prev, travelerType: value }))} className="mt-2">
              {["Solo traveler", "Family vacationer", "Business traveler", "Adventure seeker", "Cultural explorer"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-lg font-semibold text-indigo-700">What topics interest you the most about your destination?</Label>
            <div className="mt-2 space-y-2">
              {[
                "Local culture and customs",
                "Legal and safety tips",
                "Language basics",
                "Historical sites and landmarks",
                "Nature and outdoor activities",
                "Transportation and logistics"
              ].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleCheckboxChange('interests', interest)}
                  />
                  <label htmlFor={interest}>{interest}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="learningTime" className="text-lg font-semibold text-indigo-700">How much time do you want to spend learning?</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, learningTime: value }))}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your preferred learning time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-10 minutes">5-10 minutes</SelectItem>
                <SelectItem value="10-20 minutes">10-20 minutes</SelectItem>
                <SelectItem value="20-30 minutes">20-30 minutes</SelectItem>
                <SelectItem value="As much time as I need">As much time as I need</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="knowledgeLevel" className="text-lg font-semibold text-indigo-700">What level of knowledge do you already have about your destination?</Label>
            <RadioGroup onValueChange={(value) => setFormData(prev => ({ ...prev, knowledgeLevel: value }))} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="I know nothing – I'm starting fresh." id="knowledge-1" />
                <Label htmlFor="knowledge-1">I know nothing – I'm starting fresh.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="I know a little – I've read or researched some." id="knowledge-2" />
                <Label htmlFor="knowledge-2">I know a little – I've read or researched some.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="I know a lot – I've been there or know people from there." id="knowledge-3" />
                <Label htmlFor="knowledge-3">I know a lot – I've been there or know people from there.</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Start learning
          </Button>
        </form>

        <Dialog open={showStartLearningModal} onOpenChange={setShowStartLearningModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ready to start your journey?</DialogTitle>
            </DialogHeader>
            <p className="text-center text-lg text-gray-700">Click the button below to start your personalized learning journey!</p>
            <DialogFooter>
              <Button onClick={() => {
                setShowStartLearningModal(false)
                setShowDashboard(true)
              }} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Start My Journey
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {jsonOutputs.map((output, index) => (
          <div key={index} className="mt-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Your Journey Details for {formData.cities[index]}</h2>
            <pre className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
              <code className="text-sm">{output}</code>
            </pre>
          </div>
        ))}
      </main>
    </div>
  )
}
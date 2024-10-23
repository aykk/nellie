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
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, PlusCircle, Globe, Book, Landmark, MapPin, Compass, Bus, Globe2, Star, Gift } from "lucide-react"
import Link from "next/link"

// ... (previous code remains unchanged)

export function FunctionalityPage() {
  // ... (previous code remains unchanged)

  const Dashboard = ({ formData }) => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedModule, setSelectedModule] = useState(null)
    const [modules, setModules] = useState(() => {
      // ... (initialization code remains unchanged)
    })

    const updateModuleStatus = (moduleType, moduleIndex, taskId, newStatus) => {
      setModules(prevModules => {
        const updatedModules = JSON.parse(JSON.stringify(prevModules))
        if (moduleType === 'country') {
          const taskIndex = updatedModules.country.modules.findIndex(m => m.id === taskId)
          if (taskIndex !== -1) {
            const oldStatus = updatedModules.country.modules[taskIndex].status
            updatedModules.country.modules[taskIndex].status = newStatus
            if (oldStatus !== 'Done' && newStatus === 'Done') {
              setPoints(prevPoints => prevPoints + 10)
            }
          }
          updatedModules.country.progress = calculateProgress(updatedModules.country.modules)
        } else {
          const taskIndex = updatedModules.cities[moduleIndex].modules.findIndex(m => m.id === taskId)
          if (taskIndex !== -1) {
            const oldStatus = updatedModules.cities[moduleIndex].modules[taskIndex].status
            updatedModules.cities[moduleIndex].modules[taskIndex].status = newStatus
            if (oldStatus !== 'Done' && newStatus === 'Done') {
              setPoints(prevPoints => prevPoints + 10)
            }
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

    const getContent = (title, location) => {
      if (!title || !location) return "No content available";
      const cleanTitle = title.replace(`in ${location}`, '').trim();
      return hardcodedContent[location]?.[cleanTitle] || `No content available for ${title}`;
    }

    const handleTaskClick = (module, moduleType, moduleIndex) => {
      if (module.status === 'To Do') {
        updateModuleStatus(moduleType, moduleIndex, module.id, 'In Progress')
      }
      setSelectedTask({ ...module, moduleType, moduleIndex })
    }

    const JiraBoard = ({ modules, moduleType, moduleIndex, updateModuleStatus }) => (
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
                  onClick={() => handleTaskClick(module, moduleType, moduleIndex)}
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
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center text-yellow-500"
                onClick={() => setShowRewards(true)}
              >
                <Star className="h-5 w-5 mr-1" />
                <span className="font-semibold">Points: {points}</span>
              </Button>
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
                  <div key={city.title} className="w-64">
                    <Card
                      className="bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors mb-4"
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
                    <div className="space-y-2">
                      <Button
                        className="w-full text-left justify-start"
                        variant="outline"
                        onClick={() => handleTaskClick(city.localResources, 'city', index)}
                      >
                        {city.localResources.title}
                      </Button>
                      <Button
                        className="w-full text-left justify-start"
                        variant="outline"
                        onClick={() => handleTaskClick(city.essentialActivities, 'city', index)}
                      >
                        {city.essentialActivities.title}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        <Dialog open={!!selectedTask} onOpenChange={(open) => {
          if (!open) setSelectedTask(null)
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask?.title}</DialogTitle>
            </DialogHeader>
            <p className="text-center text-lg text-gray-700 mt-2">
              {getContent(selectedTask?.title, selectedTask?.moduleType === 'country' ? formData.country : formData.cities[selectedTask?.moduleIndex])}
            </p>
            <DialogFooter>
              {selectedTask?.status !== 'Done' && (
                <Button
                  onClick={() => {
                    updateModuleStatus(selectedTask.moduleType, selectedTask.moduleIndex, selectedTask.id, 'Done')
                    setSelectedTask(null)
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Mark as Done
                </Button>
              )}
              <Button onClick={() => setSelectedTask(null)} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {showRewards && <RewardsWindow points={points} onClose={() => setShowRewards(false)} />}
      </div>
    )
  }

  // ... (rest of the component remains unchanged)
}
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
import { CalendarIcon, ArrowLeft, PlusCircle, Globe, Book, Landmark, MapPin, Compass, Bus, Globe2, Star } from "lucide-react"
import Link from "next/link"

const rewards = [
  { name: "5% off Lululemon", points: 100 },
  { name: "5% off Amazon", points: 150 },
  { name: "10% off TGI Fridays", points: 200 },
  { name: "Free coffee at Starbucks", points: 50 },
  { name: "15% off Booking.com", points: 300 },
  { name: "20% off Airbnb", points: 500 },
  { name: "10% off Uber rides", points: 250 },
  { name: "5% off Apple products", points: 400 },
  { name: "Free month of Netflix", points: 350 },
  { name: "10% off at Nike", points: 200 },
  { name: "15% off at Adidas", points: 250 },
  { name: "Free movie ticket", points: 150 },
  { name: "5% off at Best Buy", points: 100 },
  { name: "10% off at Sephora", points: 200 },
  { name: "Free month of Spotify Premium", points: 300 },
  { name: "15% off at H&M", points: 150 },
  { name: "10% off at Whole Foods", points: 200 },
  { name: "5% off at Target", points: 100 },
  { name: "Free car wash", points: 75 },
  { name: "20% off at local restaurants", points: 250 },
  { name: "10% off at REI", points: 200 },
  { name: "Free museum entry", points: 100 },
  { name: "15% off at Expedia", points: 350 },
  { name: "5% off at Walmart", points: 100 },
  { name: "10% off at Macy's", points: 150 },
  { name: "Free month of gym membership", points: 400 },
  { name: "15% off at Gap", points: 200 },
  { name: "10% off at Petco", points: 150 },
  { name: "5% off at Home Depot", points: 100 },
  { name: "Free oil change", points: 200 },
]

const RewardsWindow = ({ points, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Redeem Your Points</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <h3 className="mb-4 text-lg font-medium">Available Points: {points}</h3>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {rewards.map((reward, index) => (
            <div key={index} className="flex justify-between items-center mb-4 last:mb-0">
              <span>{reward.name}</span>
              <Button size="sm" disabled={points < reward.points}>
                Redeem ({reward.points} pts)
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

const hardcodedContent = {
  "South Korea": {
    "Language basics": "Learn essential Korean phrases: 안녕하세요 (annyeonghaseyo) - Hello, 감사합니다 (gamsahamnida) - Thank you, 주세요 (juseyo) - Please give me. Practice Korean alphabet (Hangul) basics.",
    "Local resources": "Visit the Korea Tourism Organization website (visitkorea.or.kr) for official travel information. Download Naver Maps for navigation and KakaoTalk for local communication.",
    "Essential activities": "Experience a traditional Korean barbecue, visit a jimjilbang (public bathhouse), and attend a K-pop concert or visit SMTOWN at COEX Artium."
  },
  "Seoul": {
    "Local culture and customs": "Bow slightly when greeting others. Remove shoes before entering homes or some traditional restaurants. Use both hands when giving or receiving items from elders.",
    "Legal and safety tips": "Seoul is generally safe, but be cautious of pickpockets in crowded areas. The legal drinking age is 19. It's illegal to smoke in most public places.",
    "Historical sites and landmarks": "Visit Gyeongbokgung Palace, Changdeokgung Palace, and Bukchon Hanok Village for traditional Korean architecture. Explore the War Memorial of Korea to learn about Korean history.",
    "Nature and outdoor activities": "Hike Bukhansan National Park for stunning city views. Stroll along Cheonggyecheon Stream or relax in Olympic Park. Visit Namsan Seoul Tower for panoramic views.",
    "Transportation and logistics": "Use T-money card for public transportation. Subway is extensive and efficient. Taxis are affordable, but have translation app ready. Avoid rush hour if possible.",
    "Local resources": "Visit the Seoul Tourism Organization website (visitseoul.net) for up-to-date information. Download Naver Map for navigation and MangoPlate for restaurant recommendations.",
    "Essential activities": "Shop in Myeongdong, experience the nightlife in Hongdae, visit a cat cafe, and try street food at Gwangjang Market. Don't miss the changing of the guard ceremony at Gyeongbokgung Palace."
  },
  "Gangnam": {
    "Local culture and customs": "Gangnam is known for its upscale lifestyle. Dress smartly when visiting high-end areas. Tipping is not customary in restaurants or cafes.",
    "Legal and safety tips": "Gangnam is very safe, but be aware of your surroundings in crowded areas like Gangnam Station. Public drinking is allowed but public intoxication is frowned upon.",
    "Historical sites and landmarks": "Visit Bongeunsa Temple for a taste of traditional Korean Buddhism amidst modern skyscrapers. Explore the Seoul Arts Center for a mix of traditional and contemporary Korean culture.",
    "Nature and outdoor activities": "Walk along the Sebitseom floating islands on the Han River. Visit the Simone Handbag Museum for a unique outdoor garden experience on their rooftop.",
    "Transportation and logistics": "Gangnam is well-connected by subway (Line 2 and Bundang Line). Taxis are readily available but can be expensive during peak hours. Consider using bike-sharing services for short trips.",
    "Local resources": "Check out the official Gangnam-gu website (english.gangnam.go.kr) for local events and information. Use Instagram and follow local Gangnam influencers for trendy spots.",
    "Essential activities": "Shop at the COEX Mall, visit the Starfield Library, experience a K-pop dance class, and dine at a Michelin-starred restaurant. Don't miss the Gangnam Style statue near Gangnam station!"
  },
  "Itaewon": {
    "Local culture and customs": "Itaewon is Seoul's most diverse area. It's more relaxed regarding traditional Korean customs. English is widely spoken here. Respect the diversity and be open to various cultures.",
    "Legal and safety tips": "While generally safe, be cautious late at night, especially in the club areas. Avoid drug solicitations - penalties are severe. Be respectful of the Muslim community around the Seoul Central Mosque.",
    "Historical sites and landmarks": "Visit the Seoul Central Mosque, the first mosque in Korea. Explore Namsan Park and N Seoul Tower nearby. Check out the War Memorial of Korea for historical insights.",
    "Nature and outdoor activities": "Hike up to Namsan Park for great views and outdoor exercise. Visit the Itaewon Land spa for a unique jimjilbang (Korean bathhouse) experience.",
    "Transportation and logistics": "Itaewon is served by Itaewon Station (Line 6). Late-night taxis can be hard to find on weekends - consider pre-booking. Many places are within walking distance.",
    "Local resources": "Follow 'Itaewon Class' shooting locations for a fun tour. Use apps like Shuttle for foreigner-friendly services. Join Meetup groups for expat events and language exchanges.",
    "Essential activities": "Try diverse international cuisines, shop for souvenirs at Itaewon Market, visit a rooftop bar for Seoul views, and experience the vibrant nightlife. Don't miss brunch culture in Itaewon's cafes!"
  }
}

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
  const [modules, setModules] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [points, setPoints] = useState(0)
  const [showRewards, setShowRewards] = useState(false)

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

  const generateModulesFromFormData = (formData) => {
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

    const cityModules = formData.cities.filter(city => city).map((city, index) => ({
      title: city,
      modules: [
        ...generateModules(city, cityInterests),
        { id: `local-resources-${city}`, title: `Local resources in ${city}`, status: "To Do" },
        { id: `essential-activities-${city}`, title: `Essential activities in ${city}`, status: "To Do" }
      ],
      progress: 0,
    }))

    return {
      country: countryModules,
      cities: cityModules
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const outputs = formData.cities.filter(city => city).map(city => {
      const cityData = { ...formData, city }
      delete cityData.cities
      return JSON.stringify(cityData, null, 2)
    })
    setJsonOutputs(outputs)
    const newModules = generateModulesFromFormData(formData)
    setModules(newModules)
    setShowStartLearningModal(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setJsonOutputs([])
    setShowDashboard(false)
    setSelectedModule(null)
    setSelectedTask(null)
    setPoints(0)
    setModules(null)
  }

  const getTaskIcon = (taskTitle) => {
    if (taskTitle.includes("Language")) return <Globe2 className="h-6 w-6 mb-2" />
    if (taskTitle.includes("culture")) return <Globe className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Legal")) return <Book className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Historical")) return <Landmark className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Nature")) return <MapPin className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Transportation")) return <Bus className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Local resources")) return <Globe2 className="h-6 w-6 mb-2" />
    if (taskTitle.includes("Essential activities")) return <Compass className="h-6 w-6 mb-2" />
    return <Compass className="h-6 w-6 mb-2" />
  }

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

  if (showDashboard) {
    return (
      <Dashboard
        formData={formData}
        modules={modules}
        setModules={setModules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        points={points}
        setPoints={setPoints}
        resetForm={resetForm}
        showRewards={showRewards}
        setShowRewards={setShowRewards}
        updateModuleStatus={updateModuleStatus}
        getTaskIcon={getTaskIcon}
        getContent={getContent}
      />
    )
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
              <Label htmlFor="departureDate" className="text-lg font-semibold text-indigo-700">When are you leaving?</Label>
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

      </main>
    </div>
  )
}

// Dashboard Component
const Dashboard = ({
  formData,
  modules,
  setModules,
  selectedModule,
  setSelectedModule,
  selectedTask,
  setSelectedTask,
  points,
  setPoints,
  resetForm,
  showRewards,
  setShowRewards,
  updateModuleStatus,
  getTaskIcon,
  getContent,
}) => {
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
              setSelectedTask={setSelectedTask}
              updateModuleStatus={updateModuleStatus}
              getTaskIcon={getTaskIcon}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={(open) => {
          if (!open) setSelectedTask(null)
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask?.title}</DialogTitle>
            </DialogHeader>
            <p className="text-center text-lg text-gray-700 mt-2">
              {getContent(
                selectedTask?.title,
                selectedTask?.moduleType === 'country' ? formData.country : formData.cities[selectedTask?.moduleIndex]
              )}
            </p>
            <DialogFooter>
              {selectedTask.status !== 'Done' && (
                <Button onClick={() => {
                  updateModuleStatus(selectedTask.moduleType, selectedTask.moduleIndex, selectedTask.id, 'Done')
                  setSelectedTask(null)
                }}>
                  Mark as Done
                </Button>
              )}
              {selectedTask.status === 'To Do' && (
                <Button onClick={() => {
                  updateModuleStatus(selectedTask.moduleType, selectedTask.moduleIndex, selectedTask.id, 'In Progress')
                  setSelectedTask(null)
                }}>
                  Mark as In Progress
                </Button>
              )}
              <Button onClick={() => setSelectedTask(null)} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showRewards && <RewardsWindow points={points} onClose={() => setShowRewards(false)} />}
    </div>
  )
}

// JiraBoard Component
const JiraBoard = ({ modules, moduleType, moduleIndex, setSelectedTask, updateModuleStatus, getTaskIcon }) => (
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
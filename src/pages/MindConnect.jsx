import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Clock } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const MindConnect = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedCounselor, setSelectedCounselor] = useState('')
  const [appointmentType, setAppointmentType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concerns: '',
    previousTherapy: '',
    urgency: 'routine'
  })

  const counselors = [
    {
      id: 'dr-chen',
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      avatar: '👩‍⚕️',
      rating: 4.9,
      experience: '12 years',
      approach: 'Cognitive Behavioral Therapy, Mindfulness-based interventions'
    },
    {
      id: 'dr-martinez',
      name: 'Dr. Carlos Martinez',
      title: 'Licensed Professional Counselor',
      specialties: ['Relationship Issues', 'Social Anxiety', 'Life Transitions'],
      avatar: '👨‍⚕️',
      rating: 4.8,
      experience: '8 years',
      approach: 'Humanistic therapy, Solution-focused brief therapy'
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Maya Johnson',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Family Dynamics', 'Trauma', 'Self-Esteem'],
      avatar: '👩‍💼',
      rating: 4.9,
      experience: '15 years',
      approach: 'Trauma-informed care, Dialectical Behavior Therapy'
    }
  ]

  const appointmentTypes = [
    {
      id: 'initial',
      name: 'Initial Consultation',
      duration: '60 minutes',
      description: 'Comprehensive assessment and treatment planning',
      price: 'Covered by student health'
    },
    {
      id: 'followup',
      name: 'Follow-up Session',
      duration: '50 minutes',
      description: 'Ongoing therapy and support',
      price: 'Covered by student health'
    },
    {
      id: 'crisis',
      name: 'Crisis Support',
      duration: '30-60 minutes',
      description: 'Immediate support for urgent concerns',
      price: 'No charge'
    }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = generateDates()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast.success('Appointment booked successfully! 💙 You\'ll receive a confirmation email shortly.')
    // Reset form
    setCurrentStep(1)
    setSelectedDate('')
    setSelectedTime('')
    setSelectedCounselor('')
    setAppointmentType('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      concerns: '',
      previousTherapy: '',
      urgency: 'routine'
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            MindConnect 🤝
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with licensed mental health professionals in a safe, confidential environment. 
            Your wellbeing is our priority.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep >= step 
                    ? 'bg-wellnest-teal text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 transition-all ${
                    currentStep > step ? 'bg-wellnest-teal' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Appointment Type' :
                currentStep === 2 ? 'Choose Counselor' :
                currentStep === 3 ? 'Select Date & Time' :
                'Your Information'
              }
            </span>
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="card-gentle p-8 mb-8">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Step 1: Appointment Type */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">
                  What type of support do you need?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {appointmentTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        appointmentType === type.id
                          ? 'border-wellnest-teal bg-wellnest-teal/5'
                          : 'border-gray-200 hover:border-wellnest-teal/50'
                      }`}
                      onClick={() => setAppointmentType(type.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {type.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{type.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {type.description}
                      </p>
                      <p className="text-wellnest-teal-dark font-medium text-sm">
                        {type.price}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Choose Counselor */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">
                  Choose your counselor
                </h2>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <motion.div
                      key={counselor.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedCounselor === counselor.id
                          ? 'border-wellnest-teal bg-wellnest-teal/5'
                          : 'border-gray-200 hover:border-wellnest-teal/50'
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{counselor.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {counselor.name}
                              </h3>
                              <p className="text-wellnest-teal-dark font-medium">
                                {counselor.title}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <span>⭐</span>
                                <span className="text-gray-700 font-medium">{counselor.rating}</span>
                              </div>
                              <p className="text-sm text-gray-500">{counselor.experience}</p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">Specializes in:</p>
                            <div className="flex flex-wrap gap-2">
                              {counselor.specialties.map((specialty) => (
                                <span
                                  key={specialty}
                                  className="px-2 py-1 bg-wellnest-teal/10 text-wellnest-teal-dark text-xs rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Approach:</strong> {counselor.approach}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">
                  Select your preferred date and time
                </h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 text-wellnest-teal mr-2" />
                    Choose a date
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {availableDates.map((date) => {
                      const dateStr = date.toISOString().split('T')[0]
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                      const dayNum = date.getDate()
                      const monthName = date.toLocaleDateString('en-US', { month: 'short' })
                      
                      return (
                        <motion.button
                          key={dateStr}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate === dateStr
                              ? 'bg-wellnest-teal text-white'
                              : 'bg-gray-50 hover:bg-wellnest-teal/10 text-gray-700'
                          }`}
                          onClick={() => setSelectedDate(dateStr)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-xs font-medium">{dayName}</div>
                          <div className="text-lg font-bold">{dayNum}</div>
                          <div className="text-xs">{monthName}</div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-wellnest-teal mr-2" />
                      Choose a time
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedTime === time
                              ? 'bg-wellnest-teal text-white'
                              : 'bg-gray-50 hover:bg-wellnest-teal/10 text-gray-700'
                          }`}
                          onClick={() => setSelectedTime(time)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Personal Information */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">
                  Tell us a bit about yourself
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none"
                        placeholder="your.email@university.edu"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What brings you here today? (Optional)
                    </label>
                    <textarea
                      name="concerns"
                      value={formData.concerns}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none resize-none"
                      placeholder="Share what you'd like to work on or any concerns you have. This helps us prepare for your session."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you been in therapy before?
                    </label>
                    <select
                      name="previousTherapy"
                      value={formData.previousTherapy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="never">No, this is my first time</option>
                      <option value="past">Yes, in the past</option>
                      <option value="currently">Yes, I'm currently in therapy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How urgent is your need for support?
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wellnest-teal/20 rounded-xl focus:border-wellnest-teal focus:outline-none"
                    >
                      <option value="routine">Routine - I can wait for the scheduled appointment</option>
                      <option value="moderate">Moderate - I'd prefer to be seen sooner if possible</option>
                      <option value="urgent">Urgent - I need support as soon as possible</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div variants={itemVariants} className="flex justify-between">
          <motion.button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'btn-secondary'
            }`}
            whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={currentStep === 4 ? handleSubmit : handleNext}
            disabled={
              (currentStep === 1 && !appointmentType) ||
              (currentStep === 2 && !selectedCounselor) ||
              (currentStep === 3 && (!selectedDate || !selectedTime)) ||
              (currentStep === 4 && (!formData.name || !formData.email))
            }
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
              (currentStep === 1 && !appointmentType) ||
              (currentStep === 2 && !selectedCounselor) ||
              (currentStep === 3 && (!selectedDate || !selectedTime)) ||
              (currentStep === 4 && (!formData.name || !formData.email))
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'btn-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{currentStep === 4 ? 'Book Appointment 💙' : 'Next'}</span>
            {currentStep < 4 && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </motion.div>

        {/* Confidentiality Notice */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 card-gentle p-6 bg-wellnest-mint/30 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-wellnest-teal" />
            <h3 className="font-semibold text-gray-800">100% Confidential</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your privacy is our top priority. All appointments are confidential and protected by HIPAA. 
            We're here to provide a safe, judgment-free space for your mental health journey.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MindConnect
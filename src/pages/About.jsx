import { motion } from "framer-motion";
import { Heart, Shield, Target, Users } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Psychologist",
    bio: "With over 15 years of experience in cognitive behavioral therapy, Dr. Johnson leads our clinical team in developing evidence-based mental health resources.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?...",
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Michael combines his passion for technology and mental health to create accessible digital solutions that make a real difference in people's lives.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...",
  },
  {
    name: "Aisha Williams",
    role: "Community Manager",
    bio: "Aisha fosters our supportive community, ensuring everyone feels heard, valued, and connected on their mental wellness journey.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?...",
  },
];
const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-indigo-600">WellNest</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Empowering individuals on their journey to mental wellness through
              innovative tools and compassionate support.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Mission
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Making mental health support accessible to everyone
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe that everyone deserves access to quality mental health
              resources, regardless of their background or circumstances.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Users className="h-8 w-8 text-indigo-600" />,
                  title: "Community",
                  description:
                    "Building a supportive network where no one has to face their challenges alone.",
                },
                {
                  icon: <Heart className="h-8 w-8 text-indigo-600" />,
                  title: "Compassion",
                  description:
                    "Approaching mental health with empathy, understanding, and respect for every individual.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-indigo-600" />,
                  title: "Privacy",
                  description:
                    "Maintaining the highest standards of confidentiality and data protection.",
                },
                {
                  icon: <Target className="h-8 w-8 text-indigo-600" />,
                  title: "Impact",
                  description:
                    "Continuously measuring and improving our effectiveness in supporting mental wellness.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the people behind WellNest
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A diverse team of mental health professionals, technologists, and
              advocates united by a common purpose.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium">{member.role}</p>
                  <p className="mt-3 text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold text-indigo-300 tracking-wide uppercase">
              Our Values
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Guiding principles that shape our work
            </p>
          </div>

          <div className="mt-16">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              {[
                {
                  name: "Evidence-Based",
                  description:
                    "We ground our resources and recommendations in the latest scientific research and clinical best practices.",
                },
                {
                  name: "Inclusive",
                  description:
                    "We celebrate diversity and strive to create an environment where everyone feels welcome and represented.",
                },
                {
                  name: "Empowering",
                  description:
                    "We provide tools and knowledge to help individuals take an active role in their mental wellness journey.",
                },
                {
                  name: "Transparent",
                  description:
                    "We are open about our methods, sources, and the limitations of our platform.",
                },
                {
                  name: "Compassionate",
                  description:
                    "We approach every interaction with kindness, empathy, and without judgment.",
                },
                {
                  name: "Innovative",
                  description:
                    "We continuously explore new ways to improve and expand our services to better serve our community.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-700 text-white">
                      {index + 1}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white">
                      {value.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-indigo-200">
                    {value.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your wellness journey?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Join our community and take the first step towards better mental
            health today.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/mind-connect"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

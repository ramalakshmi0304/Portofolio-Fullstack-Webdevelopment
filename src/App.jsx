import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiReact, SiNodedotjs, SiExpress, SiSupabase,
  SiTailwindcss, SiGithub, SiMongodb
} from "react-icons/si";
import { VscVm } from "react-icons/vsc";
import { Github, Linkedin, Mail, ArrowUp, Download, Send, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SkillCard = ({ icon, name, color = "from-slate-400 to-slate-600" }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ y: -4, scale: 1.02 }}
    className={`group bg-gradient-to-br ${color} from-slate-500/20 to-slate-600/20 border border-slate-400/30 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-400/50 transition-all duration-500 backdrop-blur-sm hover:bg-slate-500/30`}
  >
    <div className="flex items-center gap-4">
      <div className="text-3xl text-slate-100 drop-shadow-lg group-hover:text-indigo-300">{icon}</div>
      <h4 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-lg">{name}</h4>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, tech, liveDemo, github, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-indigo-200/50 transition-all duration-500 overflow-hidden hover:-translate-y-2"
  >
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
    )}

    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors">{title}</h3>
      <p className="text-slate-700 mb-6 leading-relaxed text-lg">{description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tech.map((t) => (
          <span key={t} className="px-3 py-2 bg-slate-100 text-slate-800 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group/btn bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-400 flex items-center justify-center gap-3"
        >
          <span>🔗 Live Demo</span>
          <ArrowRight className="w-5 h-5 group-hover:/btn:translate-x-1 transition-transform" />
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border-2 border-slate-300 hover:border-indigo-400 bg-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 flex items-center justify-center gap-3"
        >
          <span>💻 GitHub</span>
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </motion.div>
);

// ✅ RESUME TRACKING HOOK (FIXED)
const useResumeTracking = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  const trackDownload = () => {
    setDownloadCount(prev => {
      const newCount = prev + 1;
      console.log(`📊 Resume download #${newCount} tracked - ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      return newCount;
    });
  };

  return { downloadCount, trackDownload };
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIXED: Properly initialize resume tracking
  const { downloadCount, trackDownload } = useResumeTracking();

 const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  emailjs
    .send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
    .then(
      () => {
        alert("Thank you! Your message has been sent. 🚀");
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    );
};


  return (

    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen text-slate-900 antialiased">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-slate-100/95 backdrop-blur-2xl border-b border-slate-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-black text-slate-900">Rama Lakshmi</h1>
          <div className="hidden md:flex items-center gap-12 text-lg font-semibold text-slate-800">
            <a href="#home" className="hover:text-indigo-600 transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-indigo-500 after:transition-all hover:after:w-full">Home</a>
            <a href="#skills" className="hover:text-indigo-600 transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-indigo-500 after:transition-all hover:after:w-full">Skills</a>
            <a href="#projects" className="hover:text-indigo-600 transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-indigo-500 after:transition-all hover:after:w-full">Projects</a>
            <a href="#contact" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 hover:bg-indigo-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg">
              Contact Me <ArrowUp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative overflow-hidden pt-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-100/70"></div>
          <div className="absolute top-24 left-8 sm:left-16 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-8 sm:right-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-slate-400/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 h-[95vh] sm:h-[90vh] lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-auto text-center lg:text-left order-2 lg:order-1 lg:pl-12 max-w-lg lg:max-w-xl xl:max-w-2xl z-30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 mb-8 sm:mb-10 lg:mb-12 bg-gradient-to-r from-indigo-100/90 to-purple-100/70 px-6 sm:px-8 py-4 rounded-2xl sm:rounded-3xl backdrop-blur-xl w-fit mx-auto lg:mx-0 shadow-xl lg:shadow-2xl border border-indigo-200/60"
            >
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-indigo-700 font-black text-lg sm:text-xl uppercase tracking-widest">Full Stack Developer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[0.95] mb-8 sm:mb-10 lg:mb-12 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent drop-shadow-2xl lg:drop-shadow-4xl"
            >
              Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-2xl font-black">Rama Lakshmi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-slate-700 mb-10 sm:mb-12 lg:mb-14 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium tracking-wide opacity-90"
            >
              Full Stack Developer specializing in React, Node.js, and Supabase — crafting scalable applications with secure authentication and real-time systems.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#contact"
                className="group relative bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-700 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-black hover:shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] hover:-translate-y-2 transition-all duration-700 flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto backdrop-blur-sm border border-indigo-500/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get In Touch</span>
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
              {/* ✅ FIXED RESUME BUTTON WITH TRACKING */}
              <motion.a
                href="/resume.pdf"
                download
                onClick={trackDownload}
                className="group border-4 border-slate-200 hover:border-indigo-300/70 bg-white/95 backdrop-blur-xl px-8 sm:px-10 py-5 sm:py-6 rounded-2xl sm:rounded-3xl text-slate-900 font-black text-lg sm:text-xl hover:bg-slate-50/95 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
                <span>Resume ({downloadCount})</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ✅ FIXED PHOTO WITH DUMMY IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.7,
              rotate: -10,
              filter: "blur(10px)"
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)"
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2
            }}
            className="w-full lg:w-auto flex justify-center lg:justify-end order-1 lg:order-2 mt-16 sm:mt-20 lg:mt-0 lg:-mt-32 xl:-mt-40"
          >
            <motion.div
              className="relative group max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none mx-auto lg:mx-0 shadow-2xl lg:shadow-3xl order-2 lg:order-1"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[460px] xl:h-[460px] rounded-3xl overflow-hidden border-4 sm:border-8 border-white/70 bg-gradient-to-br from-slate-100/90 to-slate-200/80 p-4 sm:p-6 lg:p-8 backdrop-blur-xl z-20 relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Rama Lakshmi - Full Stack Developer"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </div>

              <motion.div
                className="absolute -inset-4 lg:-inset-6 bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-indigo-500/25 rounded-3xl blur-xl opacity-0 lg:group-hover:opacity-100 transition-all duration-1000 z-10 hidden lg:block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 1.6 }}
              />

              <motion.div
                className="absolute -top-3 -right-3 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-indigo-500/30 rounded-xl blur-lg z-0"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-500/30 rounded-lg blur-md z-0"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -120, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>


          </motion.div>
        </div>

      </section>

      {/* SKILLS - PROFESSIONAL UPGRADE */}
      {/* PREMIUM SKILLS SECTION */}
      <section
        id="skills"
        className="relative py-32 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Tech Stack
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Technologies I use to build scalable and production-ready applications.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

            {[
              { name: "HTML5", icon: <SiHtml5 className="text-5xl text-orange-500" /> },
              { name: "CSS3", icon: <SiCss3 className="text-5xl text-blue-500" /> },
              { name: "React", icon: <SiReact className="text-5xl text-cyan-400" /> },
              { name: "Tailwind CSS", icon: <SiTailwindcss className="text-5xl text-sky-400" /> },
              { name: "Node.js", icon: <SiNodedotjs className="text-5xl text-green-600" /> },
              { name: "Express", icon: <SiExpress className="text-5xl text-gray-800 dark:text-white" /> },
              { name: "Supabase", icon: <SiSupabase className="text-5xl text-emerald-500" /> },
              { name: "MongoDB", icon: <SiMongodb className="text-5xl text-green-500" /> },
              { name: "GitHub", icon: <SiGithub className="text-5xl text-black dark:text-white" /> },
              { name: "VS Code", icon: <VscVm className="text-5xl text-blue-500" /> },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.08,
                }}
                className="group relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                {/* Card */}
                <div className="relative bg-white rounded-3xl p-10 flex flex-col items-center justify-center space-y-5 shadow-xl border border-slate-200 transition-all duration-500 group-hover:shadow-2xl">

                  {/* Floating Icon */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {skill.icon}
                  </motion.div>

                  <p className="text-lg font-bold text-slate-800 tracking-wide">
                    {skill.name}
                  </p>

                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8">Featured Projects</h2>
            <p className="text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Real-world applications demonstrating end-to-end development expertise.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 lg:gap-16"
          >
            <ProjectCard
              title="🍳 Recipe Management System"
              description="Full-stack recipe discovery app with AI-powered search, user favorites, authentication, and PostgreSQL integration."
              tech={["React", "Node.js", "Supabase", "Prisma"]}
              link="https://github.com/yourusername/recipe-app"
              image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000"
            />
            <ProjectCard
              title="📦 Order Management Dashboard"
              description="Enterprise order processing platform with real-time analytics, role-based access, and comprehensive reporting."
              tech={["React", "Express.js", "Supabase", "Tailwind"]}
              link="https://github.com/yourusername/order-management"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000"
            />
          </motion.div>
        </div>
      </section>
      {/* CONTACT */}
      <section id="contact" className="py-40 bg-gradient-to-t from-slate-900 to-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-8">Contact Me</h2>
            <p className="text-2xl text-slate-300 max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Send me a message!
            </p>
          </motion.div>

          {/* GRID LAYOUT */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT SIDE - CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-10 border border-slate-700/50 shadow-2xl">

                <h3 className="text-3xl font-black mb-8">Get In Touch</h3>

                {/* Phone */}
                <div className="mb-6">
                  <p className="text-slate-400 text-sm">Mobile</p>
                  <a href="tel:+919876543210" className="text-xl font-bold hover:text-indigo-400">
                    +91 77607 55588
                  </a>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <p className="text-slate-400 text-sm">Email</p>
                  <a href="mailto:hello@ramalakshmi.dev" className="text-xl font-bold hover:text-indigo-400 break-all">
                    mlakshmipradeep@gmail.com
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-xl font-bold">Anantapur, Andhra Pradesh</p>
                  <p className="text-slate-400 text-sm">India</p>
                </div>

              </div>
            </motion.div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block font-semibold mb-3">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-2xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-2xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-3">Message</label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-2xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Add after Projects section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Currently Learning</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Deepening expertise in modern development practices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-500"
            >
              <div className="text-3xl mb-4 group-hover:text-indigo-600 transition-colors">⚛️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700">TypeScript</h3>
              <p className="text-slate-600 leading-relaxed">Strict typing, generics, advanced utility types, type-safe APIs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-500"
            >
              <div className="text-3xl mb-4 group-hover:text-indigo-600 transition-colors">🏗️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700">System Design</h3>
              <p className="text-slate-600 leading-relaxed">Scalability, microservices, database optimization, distributed systems</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-500"
            >
              <div className="text-3xl mb-4 group-hover:text-indigo-600 transition-colors">🎛️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700">Advanced React</h3>
              <p className="text-slate-600 leading-relaxed">Custom hooks, concurrent mode, performance optimization, state machines</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

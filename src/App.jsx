import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiHtml5, SiCss3, SiReact, SiNodedotjs, SiExpress, SiSupabase, SiTailwindcss, SiGithub, SiMongodb, SiShadcnui } from "react-icons/si";
import { VscVm } from "react-icons/vsc";
import { User, Linkedin, Mail, ArrowUp, Download, Moon, Sun, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProjectCard = ({ title, description, tech, liveDemo, github, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    {image && (
      <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl relative">
        <img src={image} alt={title} className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
    )}
    <div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-lg">{description}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {tech.map((t) => (
          <span key={t} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-600">{t}</span>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a href={liveDemo} className="flex-1 bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
          <span>🔗 Live Demo</span> <ArrowRight className="w-5 h-5"/>
        </a>
        <a href={github} className="flex-1 border-2 border-slate-300 dark:border-slate-600 dark:text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3">
          <span>💻 GitHub</span> <SiGithub className="w-5 h-5" />
        </a>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // IMAGE PLACEHOLDER LOGIC: Replace 'null' with your image path later
  const profileImg = null; 

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 antialiased transition-colors duration-500">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">Rama Lakshmi</h1>
          <div className="hidden md:flex items-center gap-10">
            <a href="#home" className="text-lg font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
            <a href="#skills" className="text-lg font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#projects" className="text-lg font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 transition-all">
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <a href="#contact" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Contact</a>
          </div>
        </div>
      </nav>

     {/* HERO SECTION */}
<section id="home" className="min-h-screen pt-32 px-6 relative overflow-hidden flex items-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
  <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
    
    {/* LEFT SIDE: PROFILE IMAGE */}
    <motion.div 
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
      className="flex justify-center lg:justify-start order-2 lg:order-1"
    >
      <div className="relative group">
        {/* Main Image Container */}
        <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-[40px] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-colors">
          {profileImg ? (
            <img src={profileImg} alt="Rama Lakshmi" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-slate-400 dark:text-slate-600">
              <User size={120} strokeWidth={1} />
              <span className="text-sm font-bold mt-4 uppercase tracking-widest">Profile Photo</span>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-indigo-500/20 dark:bg-indigo-500/10 rounded-[40px] blur-2xl"></div>
        <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-xl"></div>
      </div>
    </motion.div>

    {/* RIGHT SIDE: ABOUT ME TEXT */}
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
      className="text-center lg:text-left order-1 lg:order-2"
    >
      <div className="inline-flex items-center gap-3 mb-8 bg-indigo-100 dark:bg-indigo-900/40 px-6 py-3 rounded-2xl border border-indigo-200 dark:border-indigo-800">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 bg-indigo-600 rounded-full" 
        />
        <span className="text-indigo-700 dark:text-indigo-400 font-black uppercase tracking-[0.2em] text-sm">Full Stack Developer</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 dark:text-white transition-colors">
        Hi, I'm <br/>
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Rama Lakshmi
        </span>
      </h1>
      
      <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium transition-colors">
        I build high-performance web applications using React, Node.js, and Supabase, focusing on seamless user experiences and scalable architecture.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
        <a 
          href="#contact" 
          className="px-10 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:bg-indigo-700 hover:scale-105 transition-all text-center shadow-xl shadow-indigo-500/25"
        >
          Get In Touch
        </a>
        <button 
          onClick={() => setDownloadCount(c => c + 1)} 
          className="px-10 py-6 bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg"
        >
          <Download size={24}/> Resume ({downloadCount})
        </button>
      </div>
    </motion.div>

  </div>
</section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-40 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 dark:text-white">Tech Stack</h2>
            <div className="h-2 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "React", icon: <SiReact className="text-cyan-400" /> },
              { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
              { name: "Supabase", icon: <SiSupabase className="text-emerald-500" /> },
              { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
              { name: "shadcn/ui", icon: <SiShadcnui className="text-slate-900 dark:text-white" /> }, 
              { name: "Express", icon: <SiExpress className="dark:text-white" /> },
              { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
              { name: "GitHub", icon: <SiGithub className="dark:text-white" /> },
              { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> }
            ].map((skill, i) => (
              <motion.div 
          key={i} 
          whileHover={{ y: -10, scale: 1.02 }} 
          className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[32px] border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-6 transition-all shadow-lg hover:shadow-indigo-500/10"
        >
          <span className="text-6xl md:text-7xl">{skill.icon}</span>
          <span className="text-xl md:text-2xl font-black dark:text-slate-200">{skill.name}</span>
        </motion.div>
   
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-40 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24 dark:text-white">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <ProjectCard title="🍳 Recipe Management" description="Full-stack discovery app with AI-powered search and auth." tech={["React", "Node.js", "Supabase"]} image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" />
            <ProjectCard title="📦 Order Management" description="Enterprise platform with real-time analytics." tech={["React", "Express", "PostgreSQL"]} image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-40 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black mb-10 dark:text-white leading-tight">Ready to build<br/>something great?</h2>
            <div className="space-y-8">
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Email Me</p>
                <p className="text-2xl font-black dark:text-white">mlakshmipradeep@gmail.com</p>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Location</p>
                <p className="text-2xl font-black dark:text-white">Anantapur, AP, India</p>
              </div>
            </div>
          </div>
          
          <form className="bg-slate-50 dark:bg-slate-800 p-12 rounded-[40px] space-y-6 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="space-y-2">
              <label className="text-lg font-bold ml-2">Your Name</label>
              <input type="text" className="w-full p-6 rounded-2xl bg-white dark:bg-slate-700 border-none focus:ring-4 focus:ring-indigo-500/20 text-lg dark:text-white transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-bold ml-2">Email Address</label>
              <input type="email" className="w-full p-6 rounded-2xl bg-white dark:bg-slate-700 border-none focus:ring-4 focus:ring-indigo-500/20 text-lg dark:text-white transition-all" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-bold ml-2">Message</label>
              <textarea rows="4" className="w-full p-6 rounded-2xl bg-white dark:bg-slate-700 border-none focus:ring-4 focus:ring-indigo-500/20 text-lg dark:text-white transition-all" placeholder="Tell me about your project..."></textarea>
            </div>
            <button className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-500/20">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
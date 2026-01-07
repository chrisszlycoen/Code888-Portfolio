import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const TimelineSection = () => {
const experiences = [
    {
        year: "2026 - Present",
        title: "Mobile App & Game Developer",
        company: "Personal Projects",
        description: "Developing mobile apps using Flutter and exploring game development with Unity Engine. Building interactive, user-friendly applications and games while integrating secure and efficient code practices.",
        icon: Briefcase
    },
    {
        year: "2025 - Present",
        title: "Full Stack & Cybersec Enthusiast",
        company: "Personal Projects",
        description: "Building secure web apps like SecureScholars and Ciphera using React, Node.js, MongoDB. Focused on authentication, authorization, and practical cybersecurity in projects.",
        icon: Briefcase
    },
    {
        year: "2024 - 2025",
        title: "Ethical Hacker in Training",
        company: "Personal Learning & Labs",
        description: "Practiced penetration testing, network analysis with Wireshark, and system security on Kali Linux. Developed skills in secure coding and database security.",
        icon: Award
    },
    {
        year: "2024 - Present",
        title: "Software Engineering Student",
        company: "Rwanda Coding Academy",
        description: "Learning Full Stack Development, C Programming, Data Structures, Databases, and Embedded Systems. Built projects integrating coding and security.",
        icon: GraduationCap
    }
];


    return (
        <section id="experience" className="py-24 bg-background relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="section-heading text-foreground">My Journey</h2>
                    <p className="text-muted-foreground">The path that led me here</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-white/10" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="w-full md:w-5/12">
                                    <div className="floating-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                                        <span className="text-primary font-mono text-sm mb-2 block">{exp.year}</span>
                                        <h3 className="text-xl font-bold text-muted-foreground mb-1">{exp.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                    <exp.icon className="w-5 h-5" />
                                </div>

                                {/* Empty Side for balance */}
                                <div className="hidden md:block w-5/12" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;

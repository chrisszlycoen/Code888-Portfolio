import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const TimelineSection = () => {
    const experiences = [
        {
            year: "2023 - Present",
            title: "Senior Full Stack Developer",
            company: "Tech Solutions Inc.",
            description: "Leading development of enterprise-scale applications using React, Node.js, and Cloud Infrastructure.",
            icon: Briefcase
        },
        {
            year: "2021 - 2023",
            title: "Cybersecurity Analyst",
            company: "SecureNet Defense",
            description: "Conducted penetration testing and security audits for financial institutions.",
            icon: Award
        },
        {
            year: "2019 - 2021",
            title: "RWANDA CODING ACADEMY",
            company: "Education",
            description: "Specialized training in Software Engineering and Embedded Systems.",
            icon: GraduationCap
        }
    ];

    return (
        <section id="experience" className="py-24 bg-background relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="section-heading text-white">My Journey</h2>
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
                                    <div className="floating-card p-6 rounded-lg border border-white/5 hover:border-primary/50 transition-colors">
                                        <span className="text-primary font-mono text-sm mb-2 block">{exp.year}</span>
                                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{exp.company}</p>
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

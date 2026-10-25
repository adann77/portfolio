import {
  FaPhp, FaJava, FaPython, FaLaravel, FaReact,
  FaNetworkWired, FaFileWord, FaBrain, FaUsers, FaClock,
  FaLightbulb, FaEye, FaHandshake, FaShieldAlt,
} from "react-icons/fa";
import {
  SiKotlin, SiCodeigniter, SiTailwindcss, SiMysql, SiSqlite,
  SiScikitlearn, SiMikrotik, SiCisco, SiGoogledocs,
} from "react-icons/si";
import { SiNodedotjs, SiExpress, SiPostgresql, SiJsonwebtokens, SiKnexdotjs, SiFlutter, SiDart, SiTypescript, SiJavascript, SiNextdotjs, SiGreensock } from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";
import { HiCog, HiServer, HiChartBar } from "react-icons/hi";

export const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Knex.js", icon: SiKnexdotjs },
      { name: "JWT Auth", icon: SiJsonwebtokens },
      { name: "REST API", icon: HiServer },
      { name: "Nodemailer", icon: HiCog },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "PHP", icon: FaPhp },
      { name: "Java", icon: FaJava },
      { name: "Python", icon: FaPython },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "Laravel", icon: FaLaravel },
      { name: "CodeIgniter 3", icon: SiCodeigniter },
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "GSAP", icon: SiGreensock },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "SQLite", icon: SiSqlite },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "XGBoost", icon: HiChartBar },
      { name: "Random Forest", icon: TbBinaryTree },
      { name: "Logistic Regression", icon: HiChartBar },
      { name: "Preprocessing", icon: HiCog },
      { name: "Feature Engineering", icon: HiCog },
      { name: "Model Evaluation", icon: HiChartBar },
    ],
  },
  {
    title: "Networking",
    skills: [
      { name: "MikroTik", icon: SiMikrotik },
      { name: "Cisco", icon: SiCisco },
      { name: "Network Configuration", icon: FaNetworkWired },
      { name: "Basic Network Admin", icon: HiServer },
    ],
  },
  {
    title: "Documentation",
    skills: [
      { name: "Microsoft Word", icon: FaFileWord },
      { name: "Google Docs", icon: SiGoogledocs },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", icon: FaLightbulb },
      { name: "Communication", icon: FaUsers },
      { name: "Teamwork", icon: FaHandshake },
      { name: "Time Management", icon: FaClock },
      { name: "Adaptability", icon: FaBrain },
      { name: "Attention to Detail", icon: FaEye },
      { name: "Responsibility", icon: FaShieldAlt },
    ],
  },
];

import { Config } from "@/types/config";
import { MdOutlineDevices, MdAttachment } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import {PiTrophy, PiBooks, PiMediumLogoBold, PiFileCSharp} from "react-icons/pi";
import { GoalIcon, ProjectIcon, ProjectRoadmapIcon } from '@primer/octicons-react'
import {LuGithub, LuPencil, LuLinkedin, LuRss, LuMail, LuMapPin, LuInstagram} from "react-icons/lu";
import {FaFlutter, FaSquareInstagram, FaXTwitter} from "react-icons/fa6";
import {FaReact, FaAws, FaInstagramSquare} from "react-icons/fa";
import {TbBrandCSharp, TbPhoneCalling} from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import {AiFillInstagram, AiOutlineInstagram, AiOutlineJava, AiOutlinePython} from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import {SiLatex, SiFastapi, SiKubernetes, SiPostman, SiSpring, SiApachekafka, SiSocketdotio} from "react-icons/si";
import {BiLogoFlask, BiLogoInstagram} from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import {DiDart, DiJava, DiRedis} from "react-icons/di";
import {
  TbBrandCpp, TbBrandTypescript,
  TbBrandGolang, TbBrandNextjs,
  TbBrandDjango, TbBrandDocker, TbBrandMysql,
  TbMarkdown, TbBrandAstro, TbBrandTerraform,
  TbPhotoSquareRounded
} from "react-icons/tb";
import {GiSpring} from "react-icons/gi";
import {GrJava} from "react-icons/gr";

const config: Config = {
  avatar: '/images/profile.webp',
  title: "Art Vandeth | Open Source Enthusiast",
  description: "I'm Art Vandeth, a graduate with a Bachelor's degree from Royal University of Phnom Penh (RUPP) 🐼, driven by a sincere passion for Software Engineering 💻.",
  author: "Art Vandeth",
  keywords: [
    "Art Vandeth",
    "",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: "Software Engineer ⚡️",
  siteURL: "https://www.1chooo.com",
  openGraph: {
    url: "https://www.1chooo.com/",
    type: "website",
    siteName: "Art Vandeth | Open Source Enthusiast",
    title: "Art Vandeth | Open Source Enthusiast",
    description: "I'm Art Vandeth, a graduate with a Bachelor's degree from Royal University of Phnom Penh (RUPP) 🐼, driven by a sincere passion for Software Engineering 💻.",
    images: [
      {
        url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
        width: 1200,
        height: 630,
        alt: "Art Vandeth Cover Image",
      },
    ],
  },
  navItems: [
    { path: '/', label: 'About' },
    { path: '/resume', label: 'Resume' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/post', label: 'Post' },
    { path: '/gallery', label: 'Gallery' },
  ],
  contacts: [
    {
      icon: LuMapPin,
      title: "Location",
      content: "Phnom Penh",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:artvandeth@gmail.com",
      content: "artvandeth@gmail.com",
    },
    // {
    //   icon: TbPhoneCalling,
    //   title: "Phone",
    //   content: "404 Not Found 📲",
    // },
    {
      icon: LuGithub,
      title: "GitHub",
      link: "https://github.com/Art-Vanndeth",
      content: "Art-Vanndeth",
    },
    // {
    //   icon: IoCalendarOutline,
    //   title: "Birthday",
    //   content: "January 27, 2002 🐻",
    // },
    {
      icon: LuLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/art-vandeth-1a15a3325/",
      content: "Art Vandeth",
    },
  ],
  socialLinks: [
    { url: `https://github.com/Art-Vanndeth`, icon: LuGithub, name: 'GitHub' },
    { url: `https://www.linkedin.com/in/art-vandeth-1a15a3325/`, icon: LuLinkedin, name: 'LinkedIn' },
    { url: `https://medium.com/@artvandeth`, icon: PiMediumLogoBold, name: 'Medium' },
    { url: `https://x.com/vandeth10726`, icon: FaXTwitter, name: 'Twitter' },
    { url: `https://www.instagram.com/xa_deth/`, icon: LuInstagram, name: 'Instagram' },
    // { url: `/rss.xml`, icon: LuRss, name: 'RSS Feed' },
    // { url: `/cv.pdf`, icon: MdAttachment, name: 'CV' },
  ],
  about: {
    "firstName": 'Art',
    "lastName": 'Vandeth',
    "middleName": "",
    "preferredName": "",
    "additionalName": "",
    "pronouns": 'He/Him',
    "githubUsername": "Art-Vanndeth",
    "introduction": `
I obtained my Bachelor's degree from [Royal University of Phnom Penh️ 🐼](https://www.rupp.edu.kh/), driven by a *sincere passion* for **Software Engineering 💻.**

I am a flexible and adaptable professional with a passion for leadership,
teamwork, and collaboration. With strong communication and
organizational skills, I excel in dynamic environments and enjoy exploring
new technologies. My goal is to use my expertise to drive innovation,
support meaningful projects, and contribute to economic growth while
building strong team relationships.

In my spare time, I focus on contributing to open-source projects, alongside working out 💪🏻, capturing street photography 📸, and writing tech content ✍🏻.

**Self-motivated, Team player, Love coding 👨🏻‍💻**
    `,
    "lifestyles": [
      {
        icon: LuGithub,
        title: "Open Source",
        text: "Actively contributing to open source projects on GitHub."
      },
      {
        icon: LuPencil,
        title: "Storytelling",
        text: "Love to share my knowledge and experience with others."
      },
      {
        icon: GoalIcon,
        title: "Workouts",
        text: "Basketball and weight training defines my active workout lifestyle."
      },
      {
        icon: TbPhotoSquareRounded,
        title: "Photography",
        text: "Sky brings freedom; streets, a reminder of others' contributions."
      }
    ],
    "techStacks": {
      programmingLanguages: [
        { name: 'Python', icon: AiOutlinePython },
        { name: 'TypeScript', icon: TbBrandTypescript },
        { name: 'Golang', icon: TbBrandGolang },
        { name: 'C++', icon: TbBrandCpp },
        { name: 'C#', icon: TbBrandCSharp },
        { name: 'Java', icon: DiJava },
        { name: 'JavaScript', icon: RiJavascriptLine },
        { name: 'Websocket', icon: SiSocketdotio },
        { name: 'Kafka', icon: SiApachekafka },
        { name: 'Dart', icon: DiDart },
      ],
      frameworks: [
        { name: 'Spring', icon: SiSpring },
        { name: 'React', icon: FaReact },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'Flask', icon: BiLogoFlask },
        { name: 'Redis', icon: DiRedis },
        { name: 'Linux Terminal', icon: VscTerminalLinux },
        { name: 'AWS', icon: FaAws },
        { name: 'Next.js', icon: TbBrandNextjs },
        { name: 'Docker', icon: TbBrandDocker },
        { name: 'Django', icon: TbBrandDjango },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'Postman', icon: SiPostman },
        { name: 'Flutter', icon: FaFlutter },
      ],
    }
  },
  resume: {
    "educations": {
      "icon": IoSchoolOutline,
      "title": "Education",
      "items": [
        {
          company: "Royal University of Phnom Penh",
          location: "Phnom Penh",
          role: "Bachelor of Computer Science",
          duration: "Oct. 2019 — Nov. 2023",
          
//           tasksMarkdown: `
// - **Minor Specialty:** Computer Science & Information Engineering
// - **Graduate-level Courses:** The Attack and Defense of Computers, Object-Oriented Analysis and Design.
// - **B.S.-level Courses:** Software Engineering, Principles of Programming Languages, Assembly Language and System Programming, Operating System, Computer Network, Algorithmics, Data Structures, Digital Design, Numerical Analysis
// - TA: Linux and Edge Computing, Programming Python, Weather and Artificial Intelligence, Freshman English, Student Service-Learning
//         `,

        },
        {
          company: "Institute of Science and Technology Advanced Development",
          location: "Phnom Penh",
          role: "Basic and Advanced course of Software expert training",
          duration: "Jun. 2023 — Feb. 2025",
        },
        {
          company: "Instinct Institute",
          location: "Phnom Penh",
          role: "Mobile App Development with Flutter and Dart",
          duration: "Oct. 2021 — Dec. 2021",
        },
        {
          company: "ETEC Center",
          location: "Phnom Penh",
          role: "Programming Instructor (C, C++, Java)",
          duration: "Oct. 2019 — Jan. 2020",
        },
        {
          company: "Prek Sleng High School",
          location: "Kandal",
          role: "BacII National certificated",
          duration: "Jan. 2018 — Aug. 2019",
        },

      ],
    },


    "projectTrainings": {
      "icon": PiTrophy,
      "title": "Project Trainings",
      "items": [
        {
          company: "Code Advisors",
          location: "Phnom Penh",
          role: "Bachelor of Computer Science",
          duration: "Oct. 2019 — Nov. 2023",

        },
        {
          company: "DealKh",
          location: "Phnom Penh",
          role: "Bachelor of Computer Science",
          duration: "Oct. 2019 — Nov. 2023",

        },
        {
          company: "Sala",
          location: "Phnom Penh",
          role: "Bachelor of Computer Science",
          duration: "Oct. 2019 — Nov. 2023",

        },
        {
          company: "Library Management System",
          location: "Phnom Penh",
          role: "Bachelor of Computer Science",
          duration: "Oct. 2019 — Nov. 2023",

        },
      ],
    },




    // @Award & Leaderships
//     "awardLeaderships": {
//       "icon": PiTrophy,
//       "title": "Award & Leaderships",
//       "items": [
//         {
//           company: "2023 Weather Hackathon",
//           location: "Taipei, Taiwan",
//           role: "Team Leader, Full Stack Developer",
//           duration: "May, 2023 - Aug, 2023",
//           tasksMarkdown: `
// - The second place winner, as well as the Executive Yuan Sustainability Special Award 
// <sup>[[News](https://www.weatherrisk.com/post/%E7%AC%AC%E4%BA%8C%E5%B1%86-%E5%A4%A9%E6%B0%A3%E9%BB%91%E5%AE%A2%E6%9D%BE-%E5%9C%93%E6%BB%BF%E6%88%90%E5%8A%9F%EF%BC%8Cesg%E3%80%81%E6%B0%B8%E7%BA%8C%E8%AD%B0%E9%A1%8C%E5%8F%97%E8%A9%95%E5%AF%A9%E8%A6%AA%E7%9D%9E)] | 
// [[GitHub](https://github.com/Weather-Shakespeare)] | 
// [[Blog](https://weather-shakespeare.github.io/)]</sup>
//         `,
//         },
//       ],
//     },


    // @Teaching Experiences
//     "teachingExperiences": {
//       "icon": PiBooks,
//       "title": "Teaching",
//       "items": [
//         {
//           "company": "Royal University of Phnom Penh",
//           "location": "Phnom Penh, Cambodia",
//           "role": "Teaching Assistant",
//           "duration": "Feb. 2021 - Jun. 2024",
//           "tasksMarkdown": `
// - GS4538 Linux and Edge Computing, 24 Spring, Dr. Chia-Kai Chang <sup>[[Website](https://ncuedu.tw/course/linux)] | [[GitHub](https://github.com/NCU-GS4538-Linux)]</sup>
// - AP4064 Weather and Artificial Intelligence II, 24 Spring, Mr. Che-Wei Chou <sup>[[GitHub](https://github.com/weather-and-ai)]</sup>
// - AP4063 Weather and Artificial Intelligence I, 23 Fall, Mr. Che-Wei Chou <sup>[[GitHub](https://github.com/weather-and-ai)]</sup>
// - GS4719 Python Programming, 23 Fall, Dr. Chia-Kai Chang <sup>[[Website](https://ncuedu.tw/course/python)] | [[GitHub](https://github.com/NCU-GS4719-Python)]</sup>
// - Freshman English, 22 Fall & 23 Spring Dr. Chen, Jou-Yin
// - Student Service-Learning, 21 Spring, Prof. Wei-Yu Chang
//         `,
//         },
//       ],
//     },


    "professionalExperiences": {
      "icon": MdOutlineDevices,
      "title": "Professional Experience",
      "items": [
        {
          "company": "The Fortune Tower",
          "location": "Phnom Penh, Cambodia",
          "role": "Customer Service Officer",
          "duration": "Dec. 2021 - Jan. 2023",
          "tasksMarkdown": `
- Assisted customers by providing prompt and professional support, ensuring a high level of satisfaction.
- Managed and resolved customer inquiries regarding property services, leasing agreements, and facility management.
- Coordinated with internal teams to address maintenance requests and service-related issues efficiently.
- Maintained detailed records of customer interactions, complaints, and resolutions to improve service quality.
- Provided guidance on company policies and procedures, ensuring smooth communication between tenants and management.
          `,
        },

        // @Professional Experience
//         {
//           "company": "Amazon Web Services",
//           "location": "Taipei, Taiwan",
//           "role": "Campus Ambassador",
//           "duration": "Aug. 2023 - Jan. 2024",
//           "tasksMarkdown": `
// - Educated 700+ cloud developers and achieved 96% user satisfaction by conducting 2 technical workshops, developing an open-source project, and 1 UAD with AWS cloud services. Refer [here](https://github.com/aws-educate-tw/aws-line-business-card-workshop) for the source code.
// - Conducted a comprehensive 35+ page market research study on cloud suppliers as part of an 11-member team.
//           `,
//         },
//         {
//           "company": "PEGATRON Corporation",
//           "location": "Taipei, Taiwan",
//           "role": "Software Engineer Intern",
//           "duration": "Jul. 2023 - Aug. 2023",
//           "tasksMarkdown": `
// - Executed a POC, adapting an LLM model for Smart Manufacturing, and was awarded Silver internship team.
// - Collaborated with a team of 5, utilized Git, a CI/CD pipeline, and followed an agile Scrum workflow.
// - Implemented Prompt Engineering and LangChain for the NVIDIA Ominerve visual robot, enabling seamless speech/text operation, boosting test support by 83% across 6-11 scenarios with 85% stability.
//           `,
//         },
//         {
//           "company": "National Central University",
//           "location": "Taoyuan, Taiwan",
//           "role": "Website Developer",
//           "duration": "Jul. 2022 - Jan. 2023",
//           "tasksMarkdown": `
// - Partnered with a team of 2 to develop a multi-user score management system for the Center for Teacher Education, reducing credit exemption processing time by 80% and remotely maintaining the server via SSH.
//           `,
//         },


      ],
    },
  },
  "giscusConfig": {
    id: "comments",
    repo: "1chooo/1chooo.com",
    repoId: "R_kgDOLBatdw",
    category: "General",
    categoryId: "DIC_kwDOLBatd84CjpPs",
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  "googleAnalyticId": process.env.NEXT_PUBLIC_GA_ID || '',
  "googleTagManagerId": process.env.NEXT_PUBLIC_GTM_ID || '',
};

export default config;

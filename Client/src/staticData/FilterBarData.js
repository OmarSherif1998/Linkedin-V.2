import { MdStars } from "react-icons/md"; // For You
import { FcDocument } from "react-icons/fc"; //Easy apply
import { MdFactory } from "react-icons/md"; // Manefacturing
import { GiDevilMask } from "react-icons/gi"; // HR
import { FcProcess } from "react-icons/fc"; //sustainability
import { MdOutlineHomeWork } from "react-icons/md"; //Hybrid
import { FcAssistant } from "react-icons/fc"; // IT
import { RiGovernmentFill } from "react-icons/ri"; //Government
import { FaRegHospital } from "react-icons/fa"; //Healthcare
import { FcClock } from "react-icons/fc"; //Part-time
import { FcCurrencyExchange } from "react-icons/fc"; //Finance
import { BiDish } from "react-icons/bi"; //Hospitality
import { GrUserWorker } from "react-icons/gr"; //construction

export const barData = [
  { name: "For You", logo: <MdStars /> },
  { name: "Easy Apply", logo: <FcDocument /> },
  { name: "Hybrid", logo: <MdOutlineHomeWork /> },
  { name: "Part-time", logo: <FcClock /> },
  { name: "IT", logo: <FcAssistant /> },
  { name: "HR", logo: <GiDevilMask /> },
  { name: "Manufacturing", logo: <MdFactory /> },
  { name: "Sustainability", logo: <FcProcess /> },
  { name: "Government", logo: <RiGovernmentFill /> },
  { name: "Healthcare", logo: <FaRegHospital /> },
  { name: "Finance", logo: <FcCurrencyExchange /> },
  { name: "Hospitality", logo: <BiDish /> },
  { name: "Construction", logo: <GrUserWorker /> },
];

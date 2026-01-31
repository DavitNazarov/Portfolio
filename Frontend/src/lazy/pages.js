import { lazy } from "react";

export const NavBar = lazy(() => import("@/components/navbar/NavBar"));
export const Home = lazy(() => import("@/page/Home"));
export const Skills = lazy(() => import("@/page/Skills"));
export const SkillsList = lazy(() => import("@/page/SkillsList"));
export const Projects = lazy(() => import("@/page/Projects"));

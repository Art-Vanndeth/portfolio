import type { VCardIconType } from "@/types/config";
import { Project } from "next/dist/build/swc/types";

export type Resume = {
  educations?: Education;
  projectTrainings?: ProjectTrainings;
  awardLeaderships?: AwardLeaderships;
  teachingExperiences?: TeachingExperience;
  professionalExperiences?: ProfessionalExperience;
};

/**
 * TODO: https://github.com/1chooo/1chooo.com/issues/98
 */
export type ResumeProps = {
  name: string;
  title: string;
  items: {
    icon: VCardIconType;
    title: string;
    text: string;
  }[];
};

export type Education = {
  icon: VCardIconType;
  title: string;
  items: {
    company?: string;
    location?: string;
    role?: string;
    duration?: string;
    tasksMarkdown?: string;
  }[];
};

export type ProjectTrainings = {
  icon: VCardIconType;
  title: string;
  items: {
    company?: string;
    location?: string;
    role?: string;
    duration?: string;
    tasksMarkdown?: string;
  }[];
};

export type AwardLeaderships = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown?: string;
  }[];
};

export type TeachingExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown?: string;
  }[];
};

export type ProfessionalExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown?: string;
  }[];
};

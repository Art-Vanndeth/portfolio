// import type { Metadata } from "next";
// import React from "react";
// import TimeLine from '@/components/resume/timeline';
// import PageHeader from '@/components/page-header';
// import config from '@/config';
// import DownloadCV from "@/components/resume/download-cv";

// const { title } = config;

// const { resume } = config;
// const { professionalExperiences } = resume;
// const { educations } = resume;
// const { awardLeaderships } = resume;
// const { teachingExperiences } = resume;
// const { projectTrainings } = resume;

// export const metadata: Metadata = {
//   title: `Resume | ${title}`,
// };

// function Resume() {
//   return (
//     <article>
//       <PageHeader header="Hugo's Resume" />
//       <DownloadCV />
//       <TimeLine data={professionalExperiences} />
//       <TimeLine data={educations} />
//       <TimeLine
//       {/* <TimeLine data={awardLeaderships} /> */}
//       {/* <TimeLine data={teachingExperiences} /> */}
//     </article >
//   );
// }

// export default Resume


import type { Metadata } from "next";
import React from "react";
import TimeLine from '@/components/resume/timeline';
import PageHeader from '@/components/page-header';
import config from '@/config';
import DownloadCV from "@/components/resume/download-cv";

const { title } = config;

const { resume } = config;
const { professionalExperiences, educations, awardLeaderships, teachingExperiences, projectTrainings } = resume;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

function Resume() {
  return (
    <article>
      <PageHeader header="Vandeth's Resume" />
      <DownloadCV />
      {professionalExperiences && <TimeLine data={professionalExperiences} />}
      {educations && <TimeLine data={educations} />}
      {projectTrainings && <TimeLine data={projectTrainings} />}
      {awardLeaderships && <TimeLine data={awardLeaderships} />}
      {teachingExperiences && <TimeLine data={teachingExperiences} />}
    </article>
  );
}

export default Resume;
import IconTitle from "./icon-title";
import TimelineList from "./timeline-list";
import type { ProfessionalExperience } from "@/types/resume";
import type { Education } from "@/types/resume";
import type { AwardLeaderships } from "@/types/resume";
import type { TeachingExperience } from "@/types/resume";

interface TimeLineProps {
  data: ProfessionalExperience | Education | AwardLeaderships | TeachingExperience;
}

function TimeLine({ data }: TimeLineProps) {

  if (!data || !('icon' in data) || !('title' in data) || !('items' in data)) {
    return null; // or handle the error appropriately
  }

  const { icon } = data;
  const { title } = data;
  const { items } = data;

  return (
    <section className="timeline">
      <IconTitle icon={icon} title={title} />
      <TimelineList
        items={items.map((item) => ({
          ...item,
          tasksMarkdown: item.tasksMarkdown || '', // Provide a fallback value for tasksMarkdown
          company: item.company || '', // Provide a fallback value for company
          location: item.location || '', // Provide a fallback value for location
          role: item.role || '', // Provide a fallback value for role
          duration: item.duration || '', // Provide a fallback value for duration
        }))}
      />
    </section>
  );
}

export default TimeLine;

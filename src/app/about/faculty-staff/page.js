import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Faculty & Staff",
  description:
    "Meet the dedicated educators and staff at ABC School who nurture excellence and inspire growth.",
  path: "/about/faculty-staff",
  keywords: ["school faculty", "teaching staff", "educators", "ABC School teachers"],
});

const facultyMembers = [
  {
    name: "Dr. Ananya Sharma",
    role: "Principal",
    qualification: "Ph.D. in Educational Leadership",
    experience: "20+ years in education",
    subject: "Administration",
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Vice Principal",
    qualification: "M.Ed. in Curriculum Development",
    experience: "15+ years in teaching",
    subject: "Mathematics",
  },
  {
    name: "Ms. Priya Patel",
    role: "Head of Science Department",
    qualification: "M.Sc. in Physics",
    experience: "12 years in teaching",
    subject: "Physics",
  },
  {
    name: "Dr. Vikram Rao",
    role: "Senior English Teacher",
    qualification: "Ph.D. in English Literature",
    experience: "18 years in teaching",
    subject: "English",
  },
  {
    name: "Mrs. Sunita Gupta",
    role: "Head of Arts Department",
    qualification: "M.A. in Fine Arts",
    experience: "14 years in teaching",
    subject: "Visual Arts",
  },
  {
    name: "Mr. Arun Mehta",
    role: "Physical Education Director",
    qualification: "B.P.Ed., National Coach",
    experience: "10 years in coaching",
    subject: "Sports & Athletics",
  },
];

const staffMembers = [
  { name: "Mrs. Lakshmi Nair", role: "Administrative Coordinator" },
  { name: "Mr. Suresh Iyer", role: "Admission Counselor" },
  { name: "Ms. Deepa Joshi", role: "Librarian" },
  { name: "Mr. Ramesh Yadav", role: "Transport Manager" },
];

export default function FacultyStaffPage() {
  return (
    <section className="section-spacing px-4">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="Our Team"
            title="Dedicated educators committed to nurturing excellence."
            description="Our faculty and staff bring expertise, passion, and care to create an environment where every student thrives."
          />
        </Reveal>

        {/* Faculty Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facultyMembers.map((faculty, index) => (
            <Reveal key={faculty.name} delay={index * 0.08}>
              <Card className="h-full bg-white/78">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-lg font-semibold text-[var(--color-accent)]">
                    {faculty.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                      {faculty.name}
                    </h3>
                    <p className="text-sm font-medium text-[var(--color-accent)]">
                      {faculty.role}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-black/5 pt-4">
                  <p className="text-sm text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-ink)]">Subject:</span>{" "}
                    {faculty.subject}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-ink)]">Qualification:</span>{" "}
                    {faculty.qualification}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-ink)]">Experience:</span>{" "}
                    {faculty.experience}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Administrative Staff */}
        <Reveal delay={0.48}>
          <div className="mt-16">
            <h2 className="display-title text-3xl font-semibold text-center">
              Administrative Staff
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {staffMembers.map((staff, index) => (
                <Reveal key={staff.name} delay={0.56 + index * 0.06}>
                  <div className="glass-panel rounded-[20px] p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-panel-strong)] text-sm font-semibold text-white">
                      {staff.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <h3 className="mt-3 text-base font-semibold">{staff.name}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{staff.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

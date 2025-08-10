import { Community } from "../types/Community";

export const sampleCommunities: Community[] = [
  {
    id: "sample-1",
    title: "Be Vegan",
    description:
      "A community dedicated to promoting a vegan lifestyle and sustainable eating habits. Join us in making a positive impact on our planet and animal welfare.",
    createdBy: "John Doe",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    approvedByAdmin: true,
    isActive: true,
  },
  {
    id: "sample-2",
    title: "Green Living",
    description:
      "Learn and share tips about sustainable living, renewable energy, and reducing your carbon footprint. Together we can make our world greener.",
    createdBy: "Jane Smith",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    approvedByAdmin: true,
    isActive: true,
  },
  {
    id: "sample-3",
    title: "Local Farmers Market",
    description:
      "Connect with local farmers and producers. Support local agriculture and discover fresh, seasonal produce in your area.",
    createdBy: "Mike Johnson",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
    approvedByAdmin: false,
    isActive: true,
  },
  {
    id: "sample-4",
    title: "Book Reading Club",
    description:
      "A community for book lovers to discuss their latest reads, share recommendations, and organize virtual book clubs.",
    createdBy: "Sarah Wilson",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
    approvedByAdmin: true,
    isActive: false,
  },
  {
    id: "sample-5",
    title: "Tech Innovators",
    description:
      "A space for developers, designers, and tech enthusiasts to share knowledge, collaborate on projects, and discuss the latest in technology.",
    createdBy: "Alex Brown",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
    approvedByAdmin: false,
    isActive: true,
  },
];

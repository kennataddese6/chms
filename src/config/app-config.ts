import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "St. Mary's",
  shortName: "CHMS",
  churchName: "St. Mary's Community Church",
  version: packageJson.version,
  copyright: `© ${currentYear}, St. Mary's Community Church.`,
  meta: {
    title: "St. Mary's Community Church — Management & Education Platform",
    description:
      "Church management and education platform for St. Mary's Community Church. Manage members, attendance, events, and the Bible Academy.",
  },
};

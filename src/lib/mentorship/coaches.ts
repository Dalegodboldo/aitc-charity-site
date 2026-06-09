/**
 * Coach roster for the /mentorship-coaching page.
 *
 * Mirrors the entries on legacy.mickeymouseclubreunion.com/mentorship-coaching,
 * with short factual highlights (2–3 sentences) shown on each coach card.
 * Each entry's `bookUrl` is a unique Zeffy ticket page so donations route
 * to the right session, and the optional `websiteUrl` powers a future
 * secondary "Learn more" action.
 */

export type Coach = {
  slug: string;
  name: string;
  role: string;
  highlight: string;
  image: string;
  bookUrl: string;
  websiteUrl?: string;
};

export const COACHES: Coach[] = [
  {
    slug: "jennifer-mcgill",
    name: "Jennifer McGill",
    role: "Singer · Theater Actress · Artist Development",
    highlight:
      "Mouseketeer from age 10, NYU Tisch graduate, and vocal coach with 35+ years of performing. Artistic Director of Halifax Repertory Theatre and executive coach for PCG Artist Strategies (Nashville).",
    image: "/images/mentorship-coaching/coaches/jennifer-mcgill.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/5ff5cff9-f81e-4f9e-b5e6-e548a46fe26e",
    websiteUrl: "https://www.jennifermcgill.com/",
  },
  {
    slug: "rhona-bennett",
    name: "Rhona Bennett (formerly of En Vogue)",
    role: "Singer-Songwriter · Personal Development Coach",
    highlight:
      "Mouseketeer turned R&B singer and member of En Vogue for 20+ years. Founder of Personal Power University coaching school (est. 2016) and a Darkchild/Sony recording artist.",
    image: "/images/mentorship-coaching/coaches/rhona-bennett.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/3bb013ce-080e-4838-a7c0-566d7ae7c093",
    websiteUrl: "https://www.rhonabennett.com/",
  },
  {
    slug: "tony-lucca",
    name: "Tony Lucca",
    role: "Singer-Songwriter · Producer · Educator",
    highlight:
      "Nashville-based singer-songwriter and public speaker; Mouseketeer alum and Season 2 finalist on NBC's The Voice. Music featured on Parenthood, Friday Night Lights, and Felicity.",
    image: "/images/mentorship-coaching/coaches/tony-lucca.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/5a63d24e-336e-4be4-a3b5-e3d7dc0012a9",
    websiteUrl: "https://www.tonylucca.com/",
  },
  {
    slug: "deedee-magno-hall",
    name: "Deedee Magno Hall",
    role: "Singer · Actress · Voice Actress",
    highlight:
      "Original Mouseketeer and the Emmy-nominated voice of Pearl on Cartoon Network's Steven Universe. Broadway credits include If/Then, Miss Saigon, and Wicked.",
    image: "/images/mentorship-coaching/coaches/deedee-magno-hall.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/e2306254-0b3d-4b4b-be7d-d6274383567f",
  },
  {
    slug: "chasen-hampton",
    name: "Chasen Hampton",
    role: "Singer-Songwriter · Producer · Director · Educator",
    highlight:
      "Executive Director of Always In The Club Foundation, recording artist, and producer with 15+ years mentoring young performers through CHASENLIFE, LLC.",
    image: "/images/mentorship-coaching/coaches/chasen-hampton.jpg",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/ee211eb1-e43f-4412-970d-68d108dc5901",
  },
  {
    slug: "mylin-brooks-stoddard",
    name: "Mylin Brooks-Stoddard",
    role: "Singer · Speaker · Mental Health Advocate",
    highlight:
      "Mouseketeer turned recording artist (6 albums, Avex Group), writer, and mental health advocate. Co-hosts The All Things My-Dee Show with Deedee Magno Hall.",
    image: "/images/mentorship-coaching/coaches/mylin-brooks-stoddard.jpg",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/28a7a06c-969e-44ae-9e8b-d527dd79e642",
  },
  {
    slug: "lindsey-alley",
    name: "Lindsey Alley",
    role: "Singer · Actress · Comedian · Cabaret",
    highlight:
      "One of only three cast members to appear in all seven seasons of the Mickey Mouse Club. Broadway and regional theater credits across Hollywood Arms, Freaky Friday, and Legally Blonde; touring her cabaret act Blood, Sweat & Mouseketears.",
    image: "/images/mentorship-coaching/coaches/lindsey-alley.jpg",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/8f094351-6246-403f-a0de-7fbb5a4cd0ef",
  },
  {
    slug: "tasha-danner",
    name: "Tasha Danner",
    role: "Singer · Actress · Arts Education Advocate",
    highlight:
      "Co-founder of Ffynnon arts space, accounting manager at nonprofit Caldera Arts, and active across healthcare, law, higher ed, fitness, and arts organizations since 2017.",
    image: "/images/mentorship-coaching/coaches/tasha-danner.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/f9b461c9-a20c-4069-b547-df49c1eef521",
    websiteUrl: "https://www.linkedin.com/in/tasha-danner/",
  },
  {
    slug: "david-kater",
    name: "David Kater",
    role: "Singer-Songwriter · Producer",
    highlight:
      "Mouseketeer alum (joined at 13), composer with credits across Netflix, Disney, HBO, Hallmark, TLC, and more. Owner of multi-media production company Kater Creative.",
    image: "/images/mentorship-coaching/coaches/david-kater.jpg",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/5980b4dc-9fb7-4557-b7b4-9c738c835d36",
    websiteUrl: "https://www.dkater.com",
  },
  {
    slug: "axel-tillmann",
    name: "Axel Tillmann",
    role: "Entrepreneur",
    highlight:
      "CEO of Alpha Consult; serial entrepreneur with three decades of leadership across tech startups, exits, fundraising, and board governance. Active mentor in the Silicon Valley scene.",
    image: "/images/mentorship-coaching/coaches/axel-tillmann.avif",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/14788368-1395-47c1-85d9-636756d980d2",
    websiteUrl: "https://alpha-consult.com/axel-tillmann/",
  },
  {
    slug: "dale-godboldo",
    name: "Dale Godboldo",
    role: "Actor · Producer · Philanthropist",
    highlight:
      "Actor (Carl E. Douglas in Ryan Murphy's The People V. OJ Simpson), 30-year entertainment veteran, and philanthropist focused on the UN's 17 Sustainable Development Goals.",
    image: "/images/mentorship-coaching/coaches/dale-godboldo.jpg",
    bookUrl:
      "https://www.zeffy.com/en-US/ticketing/5a61f6fd-7f3d-4ea6-9f11-2e2c9c5842fd",
  },
];

import { randomUUID } from "crypto";

// Storage interface (documented with JSDoc instead of TypeScript)
/**
 * @typedef {Object} NewsArticle
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} imageUrl
 * @property {string} date
 * @property {string[]} gallery
 */

/**
 * @typedef {Object} ContactSubmission
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 * @property {Date} submittedAt
 */

/**
 * @typedef {Object} CalculatorResult
 * @property {string} id
 * @property {string} calculatorType
 * @property {Object} inputs
 * @property {Object} result
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} InsertContactSubmission
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/**
 * @typedef {Object} InsertCalculatorResult
 * @property {string} calculatorType
 * @property {Object} inputs
 * @property {Object} result
 */

/**
 * @interface IStorage
 */
class MemStorage {
  constructor() {
    /** @type {Map<string, NewsArticle>} */
    this.newsArticles = new Map();
    
    /** @type {Map<string, ContactSubmission>} */
    this.contactSubmissions = new Map();
    
    /** @type {Map<string, CalculatorResult>} */
    this.calculatorResults = new Map();
    
    // Initialize with sample news articles
    this.initializeSampleData();
  }

  async getNewsArticleBySlug(slug) {
  return this.newsArticles.get(slug);
}

  initializeSampleData() {
    const sampleNews = [
      {
  id: randomUUID(),
  title: "Home Secretary, Punjab Visit and Interactive Session with PAFDA Scientists",
  slug: "home-secretary-visit",
  excerpt: "The Home Secretary of Punjab visited PAFDA and conducted an interactive session with our dedicated team of scientists, discussing future plans and ongoing research projects.",
  imageUrl: "/sectrory.JPG",
  date: "13/11/2025",
  content: `
    <p>On November 13, 2025, PAFDA had the honor of hosting the Home Secretary of Punjab for an interactive session with our team of dedicated scientists. The visit was part of the government's initiative to strengthen collaboration between research institutions and administrative bodies.</p>
    
    <h3>Key Discussion Points</h3>
    <p>The session focused on several critical areas including:</p>
    <ul>
      <li>Advancements in agricultural research and development</li>
      <li>Implementation of modern technologies in food safety</li>
      <li>Future collaboration opportunities between PAFDA and the Punjab government</li>
      <li>Strategies for enhancing food security in the region</li>
    </ul>
    
    <p>The Home Secretary expressed appreciation for PAFDA's contributions to agricultural research and emphasized the government's commitment to supporting scientific innovation in the agricultural sector.</p>
  `,
  gallery: [
    {
      url: "/sec1.JPG",
      caption: "Home Secretary addressing PAFDA scientists"
    },
    {
      url: "/sec2.JPG",
      caption: "Interactive session in progress"
    },
    {
      url: "/sec3.JPG",
      caption: "Lab tour and demonstration"
    },
    {
      url: "/sec4.JPG",
      caption: "Play Area"
    },
    {
      url: "/sec5.JPG",
      caption: "Walk"
    }

  ]
},
      {
        id: randomUUID(),
        title: "PAFDA Welcomed Dr. Yubak Dhoj GC Senior Agriculture Officer, FAO, UN",
        slug: "fao-visit",
        excerpt: "PAFDA had the honor of welcoming Dr. Yubak Dhoj GC, Senior Agriculture Officer from the Food and Agriculture Organization, United Nations, to discuss international collaboration opportunities.",
        imageUrl: "/visit.JPG",
        date: "06/11/2025",
        content: `
    <p>On November 13, 2025, PAFDA had the honor of hosting the Home Secretary of Punjab for an interactive session with our team of dedicated scientists. The visit was part of the government's initiative to strengthen collaboration between research institutions and administrative bodies.</p>
    
    <h3>Key Discussion Points</h3>
    <p>The session focused on several critical areas including:</p>
    <ul>
      <li>Advancements in agricultural research and development</li>
      <li>Implementation of modern technologies in food safety</li>
      <li>Future collaboration opportunities between PAFDA and the Punjab government</li>
      <li>Strategies for enhancing food security in the region</li>
    </ul>
    
    <p>The Home Secretary expressed appreciation for PAFDA's contributions to agricultural research and emphasized the government's commitment to supporting scientific innovation in the agricultural sector.</p>
  `,
        gallery: [
    {
      url: "/ya1.JPG",
      caption: "Home Secretary addressing PAFDA scientists"
    },
    {
      url: "/ya2.JPG",
      caption: "Interactive session in progress"
    },
    {
      url: "/ya3.JPG",
      caption: "Lab tour and demonstration"
    }

  ]
},
      {
        id: randomUUID(),
        title: "Brig (R) Mukhtar Ahmed, President Houbara Foundation visited PAFDA",
        slug: "houbara-visit",
        excerpt: "Brigadier (Retired) Mukhtar Ahmed, President of Houbara Foundation, visited PAFDA to explore collaboration opportunities in wildlife conservation and testing services.",
        imageUrl: "/A.mukhtar.JPG",
        date: "23/10/2025",
        content: `
    <p>On November 13, 2025, PAFDA had the honor of hosting the Home Secretary of Punjab for an interactive session with our team of dedicated scientists. The visit was part of the government's initiative to strengthen collaboration between research institutions and administrative bodies.</p>
    
    <h3>Key Discussion Points</h3>
    <p>The session focused on several critical areas including:</p>
    <ul>
      <li>Advancements in agricultural research and development</li>
      <li>Implementation of modern technologies in food safety</li>
      <li>Future collaboration opportunities between PAFDA and the Punjab government</li>
      <li>Strategies for enhancing food security in the region</li>
    </ul>
    
    <p>The Home Secretary expressed appreciation for PAFDA's contributions to agricultural research and emphasized the government's commitment to supporting scientific innovation in the agricultural sector.</p>
  `,
        gallery: [
    {
      url: "/br1.JPG",
      caption: "Home Secretary addressing PAFDA scientists"
    },
    {
      url: "/br2.JPG",
      caption: "Interactive session in progress"
    },
    {
      url: "/br3.JPG",
      caption: "Lab tour and demonstration"
    }

  ]
},
      {
        id: randomUUID(),
        title: "APMEPA Delegation Visted PAFDA",
        slug: "apmepa-visit",
        excerpt: "PAFDA welcomed the delegation from APMEPA for an insightful visit focused on strengthening mutual understanding and exploring areas of shared interest.",
        imageUrl: "/Amper.JPG",
        date: "15/10/2025",
        gallery: [],
      },
      {
        id: randomUUID(),
        title: "PAFDA welcomed the Director General, Punjab Food Authority",
        slug: "dgpfa-visit",
        excerpt: "PAFDA welcomed the Director General, Punjab Food Authority, to discuss collaboration opportunities and explore potential synergies between the two institutions.",
        imageUrl: "/dgpfa.JPG",
        date: "08/10/2025",
        gallery: [],
      },
      {
        id: randomUUID(),
        title: "PAFDA and PITB held a meeting and engaged in discussion to enhance operational efficiency and address critical challenges.",
        slug: "pitb-meeting",
        excerpt: "The meeting focused on enhancing operational efficiency, streamlining processes, and ensuring alignment with national and international standards.",
        imageUrl: "/pitb.JPG",
        date: "01/10/2025",
        gallery: [],
      },
    ];

    sampleNews.forEach(article => {
      this.newsArticles.set(article.slug, article);
    });
  }

  /**
   * @returns {Promise<NewsArticle[]>}
   */
  async getAllNewsArticles() {
    return Array.from(this.newsArticles.values());
  }

  /**
 * Get a news article by its slug
 * @param {string} slug - The slug of the article to find
 * @returns {Promise<NewsArticle|undefined>} The found article or undefined
 */
async getNewsArticleBySlug(slug) {
  return this.newsArticles.get(slug);
}

  /**
   * @param {InsertContactSubmission} insertSubmission
   * @returns {Promise<ContactSubmission>}
   */
  async createContactSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  /**
   * @param {InsertCalculatorResult} insertResult
   * @returns {Promise<CalculatorResult>}
   */
  async createCalculatorResult(insertResult) {
    const id = randomUUID();
    const result = {
      ...insertResult,
      id,
      createdAt: new Date(),
    };
    this.calculatorResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
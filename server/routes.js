import express from 'express';
import { z } from 'zod';
import { storage } from './storage.js';
import { createServer } from 'http';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// GET /api/news - Get all news articles
router.get("/news", async (req, res) => {
  try {
    const news = await storage.getAllNewsArticles();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news articles" });
  }
});

// GET /api/news/:slug - Get single news article by slug
router.get("/news/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    console.log('Fetching article with slug:', slug); // Add this line
    const article = await storage.getNewsArticleBySlug(slug);
    console.log('Found article:', article); // Add this line
    
    if (!article) {
      console.log('Article not found for slug:', slug); // Add this line
      res.status(404).json({ error: "News article not found" });
      return;
    }
    
    res.json(article);
  } catch (error) {
    console.error("Error fetching news article:", error);
    res.status(500).json({ error: "Failed to fetch news article" });
  }
});

// POST /api/contact - Submit contact form
router.post("/contact", async (req, res) => {
  try {
    // Validation schema for contact form
    const contactSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      subject: z.string().min(1, "Subject is required"),
      message: z.string().min(10, "Message must be at least 10 characters"),
    });
    
    const validatedData = contactSchema.parse(req.body);
    const submission = await storage.createContactSubmission(validatedData);
    
    res.status(201).json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: submission.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        error: "Validation error", 
        details: error.errors 
      });
      return;
    }
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// POST /api/calculator - Save calculator result (optional - for analytics)
router.post("/calculator", async (req, res) => {
  try {
    // Validation schema for calculator results
    const calculatorSchema = z.object({
      calculatorType: z.string(),
      inputs: z.record(z.any()),
      result: z.record(z.any()),
    });
    
    const validatedData = calculatorSchema.parse(req.body);
    const result = await storage.createCalculatorResult(validatedData);
    
    res.status(201).json({ 
      success: true,
      id: result.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        error: "Validation error", 
        details: error.errors 
      });
      return;
    }
    console.error("Error saving calculator result:", error);
    res.status(500).json({ error: "Failed to save calculator result" });
  }
});

export default router;

// Function to register all routes with the Express app
export async function registerRoutes(app) {
  app.use('/api', router);
  
  const httpServer = createServer(app);
  return httpServer;
}
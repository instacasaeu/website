import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertContactMessageSchema } from "@shared/schema";
import { sendQuoteRequestEmail } from "./emailService";
import { z } from "zod";

// Quote request schema for email sending
const emailQuoteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  homeSize: z.string().optional(),
  details: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Home Models API
  app.get("/api/home-models", async (req, res) => {
    try {
      const models = await storage.getAllHomeModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch home models" });
    }
  });

  app.get("/api/home-models/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid model ID" });
      }
      
      const model = await storage.getHomeModelById(id);
      if (!model) {
        return res.status(404).json({ message: "Home model not found" });
      }
      
      res.json(model);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch home model" });
    }
  });

  // Quote Requests API
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuoteRequest(validatedData);
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid quote request data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });

  app.get("/api/quote-requests", async (req, res) => {
    try {
      const quotes = await storage.getAllQuoteRequests();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote requests" });
    }
  });

  // Email Quote Request API
  app.post("/api/send-quote", async (req, res) => {
    try {
      const validatedData = emailQuoteSchema.parse(req.body);
      const emailSent = await sendQuoteRequestEmail(validatedData);
      
      if (emailSent) {
        res.status(200).json({ 
          success: true, 
          message: "Quote request sent successfully" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send quote request" 
        });
      }
    } catch (error) {
      console.error("Error processing quote request:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Contact Messages API
  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid contact message data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

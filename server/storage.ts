import { 
  HomeModel, 
  InsertHomeModel, 
  QuoteRequest, 
  InsertQuoteRequest, 
  ContactMessage, 
  InsertContactMessage 
} from "@shared/schema";

export interface IStorage {
  // Home Models
  getAllHomeModels(): Promise<HomeModel[]>;
  getHomeModelById(id: number): Promise<HomeModel | undefined>;
  createHomeModel(model: InsertHomeModel): Promise<HomeModel>;
  
  // Quote Requests
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private homeModels: Map<number, HomeModel>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactMessages: Map<number, ContactMessage>;
  private currentHomeModelId: number;
  private currentQuoteId: number;
  private currentMessageId: number;

  constructor() {
    this.homeModels = new Map();
    this.quoteRequests = new Map();
    this.contactMessages = new Map();
    this.currentHomeModelId = 1;
    this.currentQuoteId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample home models
    this.initializeHomeModels();
  }

  private initializeHomeModels() {
    const sampleModels: InsertHomeModel[] = [
      {
        name: "Casa Modern Single",
        description: "Contemporary single-story design perfect for modern families",
        area: 120,
        bedrooms: 3,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "single-story",
        features: ["Open floor plan", "Large windows", "Modern kitchen", "Energy efficient"],
        basePrice: 180000
      },
      {
        name: "Casa Family Plus",
        description: "Spacious two-story home designed for growing families",
        area: 180,
        bedrooms: 4,
        bathrooms: 3,
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "two-story",
        features: ["Two-story design", "Master suite", "Family room", "Double garage"],
        basePrice: 250000
      },
      {
        name: "Casa Compact",
        description: "Efficient starter home perfect for young couples",
        area: 80,
        bedrooms: 2,
        bathrooms: 1,
        imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "compact",
        features: ["Compact design", "Efficient layout", "Modern finishes", "Low maintenance"],
        basePrice: 120000
      },
      {
        name: "Casa Executive",
        description: "Luxury home with premium finishes and spacious layout",
        area: 250,
        bedrooms: 5,
        bathrooms: 4,
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "luxury",
        features: ["Premium materials", "Spacious rooms", "Luxury finishes", "Executive office"],
        basePrice: 350000
      },
      {
        name: "Casa Eco",
        description: "Sustainable home with solar panels and green technology",
        area: 140,
        bedrooms: 3,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "eco",
        features: ["Solar panels", "Green technology", "Energy efficient", "Sustainable materials"],
        basePrice: 220000
      },
      {
        name: "Casa Holiday",
        description: "Perfect vacation home with scenic views and relaxation focus",
        area: 100,
        bedrooms: 2,
        bathrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "holiday",
        features: ["Scenic design", "Relaxation focus", "Large deck", "Vacation perfect"],
        basePrice: 160000
      }
    ];

    sampleModels.forEach(model => {
      this.createHomeModel(model);
    });
  }

  async getAllHomeModels(): Promise<HomeModel[]> {
    return Array.from(this.homeModels.values());
  }

  async getHomeModelById(id: number): Promise<HomeModel | undefined> {
    return this.homeModels.get(id);
  }

  async createHomeModel(insertModel: InsertHomeModel): Promise<HomeModel> {
    const id = this.currentHomeModelId++;
    const model: HomeModel = { ...insertModel, id };
    this.homeModels.set(id, model);
    return model;
  }

  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.quoteRequests.set(id, quote);
    return quote;
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async updateQuoteRequestStatus(id: number, status: string): Promise<QuoteRequest | undefined> {
    const quote = this.quoteRequests.get(id);
    if (quote) {
      quote.status = status;
      this.quoteRequests.set(id, quote);
      return quote;
    }
    return undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      status: "new",
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      message.status = status;
      this.contactMessages.set(id, message);
      return message;
    }
    return undefined;
  }
}

export const storage = new MemStorage();

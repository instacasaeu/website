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
    // Initialize with empty models - real models will be added through admin interface
    // For now, just initialize the Map structure
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

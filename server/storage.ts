import { users, transmitterData, type User, type InsertUser, type TransmitterData, type InsertTransmitterData } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLatestTransmitterData(): Promise<TransmitterData | undefined>;
  createTransmitterData(data: InsertTransmitterData): Promise<TransmitterData>;
  updateTransmitterData(id: number, data: Partial<InsertTransmitterData>): Promise<TransmitterData | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transmitterData: Map<number, TransmitterData>;
  private currentUserId: number;
  private currentTransmitterId: number;

  constructor() {
    this.users = new Map();
    this.transmitterData = new Map();
    this.currentUserId = 1;
    this.currentTransmitterId = 1;
    
    // Initialize with default transmitter data
    this.createTransmitterData({
      forwardPower: 2700,
      reflectedPower: 12,
      frequency: 93.4,
      rfEfficiency: 87,
      targetPower: 2700,
      isOnAir: true,
      timestamp: Date.now(),
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getLatestTransmitterData(): Promise<TransmitterData | undefined> {
    const dataArray = Array.from(this.transmitterData.values());
    return dataArray.sort((a, b) => b.timestamp - a.timestamp)[0];
  }

  async createTransmitterData(data: InsertTransmitterData): Promise<TransmitterData> {
    const id = this.currentTransmitterId++;
    const transmitterRecord: TransmitterData = { 
      ...data, 
      id,
      isOnAir: data.isOnAir ?? false
    };
    this.transmitterData.set(id, transmitterRecord);
    return transmitterRecord;
  }

  async updateTransmitterData(id: number, data: Partial<InsertTransmitterData>): Promise<TransmitterData | undefined> {
    const existing = this.transmitterData.get(id);
    if (!existing) return undefined;
    
    const updated: TransmitterData = { ...existing, ...data };
    this.transmitterData.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();

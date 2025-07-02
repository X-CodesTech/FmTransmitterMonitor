import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransmitterDataSchema } from "@shared/schema";
// import { WebSocketServer } from "ws"; // Temporarily disabled

export async function registerRoutes(app: Express): Promise<Server> {
  // Get latest transmitter data
  app.get("/api/transmitter/data", async (req, res) => {
    try {
      const data = await storage.getLatestTransmitterData();
      if (!data) {
        return res.status(404).json({ message: "No transmitter data found" });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transmitter data" });
    }
  });

  // Update transmitter settings
  app.post("/api/transmitter/settings", async (req, res) => {
    try {
      const validatedData = insertTransmitterDataSchema.parse(req.body);
      const data = await storage.createTransmitterData(validatedData);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: "Invalid transmitter data" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server temporarily disabled due to Vite conflicts
  // TODO: Re-enable WebSocket functionality once configuration is resolved
  /*
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    // Send initial data
    storage.getLatestTransmitterData().then((data) => {
      if (data) {
        ws.send(JSON.stringify({ type: "transmitter_data", data }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  // Simulate real-time data updates every 2 seconds
  setInterval(async () => {
    const currentData = await storage.getLatestTransmitterData();
    if (currentData) {
      // Simulate small variations in the data
      const newData = {
        forwardPower: currentData.forwardPower + (Math.random() - 0.5) * 10,
        reflectedPower: Math.max(0, currentData.reflectedPower + (Math.random() - 0.5) * 2),
        frequency: currentData.frequency + (Math.random() - 0.5) * 0.1,
        rfEfficiency: Math.min(100, Math.max(0, currentData.rfEfficiency + (Math.random() - 0.5) * 2)),
        targetPower: currentData.targetPower,
        isOnAir: currentData.isOnAir,
        timestamp: Date.now(),
      };

      const updatedData = await storage.createTransmitterData(newData);
      
      // Broadcast to all connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: "transmitter_data", data: updatedData }));
        }
      });
    }
  }, 2000);
  */

  return httpServer;
}

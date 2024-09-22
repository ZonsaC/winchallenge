import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to the environment variables.");
}

if (process.env.NODE_ENV === 'development') {
  // Für lokale Entwicklung: Die Verbindung zwischenspeichern
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Für Produktion: Immer eine neue Verbindung herstellen
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

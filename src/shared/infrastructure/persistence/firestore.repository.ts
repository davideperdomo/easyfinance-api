import { Firestore, CollectionReference, DocumentReference, DocumentData } from '@google-cloud/firestore';

export class FirestoreRepository {
  private db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: process.env.FIRESTORE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
  }

  // Get a reference to a collection
  private getCollection(collectionName: string): CollectionReference<DocumentData> {
    return this.db.collection(collectionName);
  }

  // Create a document
  async createDocument(collectionName: string, data: DocumentData, documentId?: string ): Promise<DocumentReference<DocumentData>> {
    const collection = this.getCollection(collectionName);
    let docRef;
    if (documentId) {
      docRef = collection.doc(documentId);
      await docRef.set(data);
    } else {
      docRef = await collection.add(data);
    }
    return docRef;
  }

  // Read a document
  async readDocument(collectionName: string, documentId: string): Promise<DocumentData | null> {
    const docRef = this.getCollection(collectionName).doc(documentId);
    const doc = await docRef.get();
    return doc.exists ? (doc.data() as DocumentData) : null;
  }

  // Update a document
  async updateDocument(collectionName: string, documentId: string, data: DocumentData): Promise<void> {
    const docRef = this.getCollection(collectionName).doc(documentId);
    await docRef.update(data);
  }

  // Delete a document
  async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    const docRef = this.getCollection(collectionName).doc(documentId);
    await docRef.delete();
  }

  // Query documents
  async queryDocuments<T>(collectionName: string, field: string, value: any): Promise<T[]> {
    const collection = this.getCollection(collectionName);
    const snapshot = await collection.where(field, '==', value).get();
    return snapshot.docs.map(doc => doc.data() as T);
  }
}
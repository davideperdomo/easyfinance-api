import { Firestore, CollectionReference, DocumentReference, DocumentData } from '@google-cloud/firestore';

export class FirestoreRepository {
  private db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: "financial-assistant-6e546",
      credentials: {
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCEzmBu27oGNoYw\nqTW10Yw+Ev0BPBKMgkkhgenI4Bk0O/FHmmpRpaZlKjL5IOJm/DS8PpVf7Kdh3GNM\nm6ojfHW/wUTD278feWr8Lc/k9k3MSc0Mt30v8sFnv2nEQb1D34Yy5vcbch2X0rOh\nVXTFyj+1L/jHx9/St4m+zttcJXVM20B4yIsK9mmnTB99hi/SgbOVwTkwV1Za1L71\nrnKvzuQfCODcJobOP9VBzO936WMW7fM2ouqCjBkxFh+Werh4Yqh97z+/tmsd48JO\nVUCJhtJuQw2jbGikqwpFkipNEUUtjxwDyAdIeLxNR1++OvqBbgtiN42Q4Xah8wSf\ntN5Rb4BLAgMBAAECggEABHcwCj+R12hOm3pFF70DuzPw6pwLf6ADN4DidzevK/DM\nDH1RD+JttZR1Vv0tFQtr9ocgMgkyGPn2eM/505b5b/OJYrs+h59nN92OfQNvMEGs\nXGjFvoP/eYPtLtqLCP+OHU4OMbpk662mY/QMqM3ugHgsJFjrL28DzwpY7pXv23VY\nz4F+P/wiDeg5/EbBlYmFyspRBJvwOu4AsOtLDkjY7mWkJx/VFPh2+pEFwHp9r5DA\nekjWPMPb3SPE3wEi+ZkJv372CocEi/iQBzNRaGfJz3XE0O9ZGJyEdA5Jq6mgzcL6\nOj0YnEMzlys7D8LRJQb9a2uKjcqgOKWy+GGEO1qnUQKBgQC5PdMm8g9X2v+sgt2I\nt0ZKetPtRES2kyan2C85D6Dzs8ATkOygRrz7xtUyOkEtkojN1W+baZwZm7l6VzLa\nEluA5Wzl7vW/cOFyZ2LJoRRigAf5RMSZ6NPq2aVCKDhvCpSjkPlHuUufAuDQ3NCC\nyOdsm3pmF0DIJPycp+x1ObBa6QKBgQC3iRElMZoy+rH+hLLkVSZYdN5fIzhIKhZ0\nfHy2A/EoOtBO94IOja6c3+tZeFVcWaHl3oLm+lW6ngozxoByKLBL+Ozk0G+dMdE/\n79odQcJMZHaanoep37RNjUvZeTqsxgdxr3z7bDEyi6GpchmzpNa5wfEV0TzZ8VXd\naBAOEbgZEwKBgQCM/VJuLQSikMvSqJQmz5/PZmdRConmEF/2liNzIcMWWbSS79Y6\nMzz5wR9ZqF8daY94YsAcoKgwEYd9Z0sMEbbVh0l4RIWE3Uyqf6f/4Psb8WigP8gH\ngN9yu479qJEzavExAVHKVm0JLO6h6b9GG9WQo1HozEABVa1zKphdrLfeqQKBgFKM\nxvZosgd99LMasm+60M12e1JlP/pNW94248zmRwCmO21ZK9kp5sDOgkeytQodkpEW\nnOAQ9qBCVypkfP9bx7fUFZDxI1KbxpcwZXVFT4QWp7Xx2ekRIkLDa7s8KKTvSQfc\nO6XGSvaGEUdqd57yZFYWoj4C55DLWKiGFrqNQ7WbAoGBAIThcgK617uLE94mYsRW\ns7iWNcqEEfRQzQhDka77OUOdz9LAhXcr28b0P+FgkVpEGfkMnLN9F2BcjeN5NGsX\nwGx3c4IAA6DgKfFDP0heKF3OXap93AEk0ycIz0rNFG4n5xLsRBhcr73KncxN5x/f\nSoIrKu/1fD0CCDIqYaREMWLi\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-dj961@financial-assistant-6e546.iam.gserviceaccount.com",
      }
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
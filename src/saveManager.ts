import type { Quiz } from '@/quizTypes';
import useDb from '@/stores/db';
import { nanoid } from 'nanoid';
import cloneDeep from 'lodash.clonedeep';

let dbStore: ReturnType<typeof useDb>;
let db: IDBDatabase;

async function tryInit() {
    if (dbStore) return;
    dbStore = useDb();
    db = await dbStore.db;
}
async function saveQuiz(quiz: Quiz): Promise<void> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');
    const query = os.put(cloneDeep(quiz));
    await dbRequestToPromise(query);
}

async function loadQuiz(id: string): Promise<Quiz> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.get(id);
    return await dbRequestToPromise(query);
}
async function deleteQuiz(id: string) {
    await tryInit();
    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');
    const query = os.delete(id);
    return dbRequestToPromise(query);
}

async function loadAll(): Promise<Quiz[]> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.getAll();
    return dbRequestToPromise(query);
}
async function newQuiz(): Promise<Quiz> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');

    const quiz = {
        name: "Unamed Quiz",
        id: nanoid(),
        created: new Date(),
        edited: new Date(),
        rounds: []
    };
    const query = os.add(quiz);
    return new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(quiz);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        };
    });
}

function dbRequestToPromise<T>(req: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => {
            console.error(e);
            reject(e);
        }
    });
}
export { saveQuiz, loadQuiz, loadAll, deleteQuiz, newQuiz };
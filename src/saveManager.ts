import type { Quiz } from '@/quizTypes';
import cloneDeep from 'lodash.clonedeep';
import useDb from '@/stores/db';
let dbStore: ReturnType<typeof useDb>;
let db: IDBDatabase;

async function tryInit() {
    if (dbStore) return;
    dbStore = useDb();
    db = await dbStore.db;
}
async function saveQuiz(quiz: Quiz) {
    await tryInit();

    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');
    const query = os.put(cloneDeep(quiz));
    query.onerror = (e) => console.error(e);
}

async function loadQuiz(id: string): Promise<Quiz> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.get(id);
    return await new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(query.result);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        };
    });
}
async function deleteQuiz(id: string) {
    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');
    const query = os.delete(id);
    return await new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(query.result);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        }
    });
}

async function loadAll(): Promise<Quiz[]> {
    await tryInit();

    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.getAll();
    return await new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(query.result);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        }
    })
}
export { saveQuiz, loadQuiz, loadAll, deleteQuiz };
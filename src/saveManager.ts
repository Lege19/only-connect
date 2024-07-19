import type { Quiz } from '@/quizJson';
import cloneDeep from 'lodash.clonedeep';
function saveQuiz(quiz: Quiz, db: IDBDatabase) {
    console.log("save")
    const transaction = db.transaction('quizes', 'readwrite');
    const os = transaction.objectStore('quizes');
    const query = os.put(cloneDeep(quiz));
    query.onerror = (e) => console.error(e);
    query.onsuccess = () => console.log("success");
}

function loadQuiz(id: string, db: IDBDatabase): Promise<Quiz> {
    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.get(id);
    return new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(query.result);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        };
    });
}

function loadAll(db: IDBDatabase): Promise<Quiz[]> {
    const transaction = db.transaction('quizes', 'readonly');
    const os = transaction.objectStore('quizes');
    const query = os.getAll();
    return new Promise((resolve, reject) => {
        query.onsuccess = () => resolve(query.result);
        query.onerror = (e) => {
            console.error(e);
            reject(e);
        }
    })
}
export { saveQuiz, loadQuiz, loadAll };
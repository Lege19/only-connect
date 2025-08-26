import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { saveQuizToDb } from '@/saveManager';
import { parseJson } from '@/quizParser'

const useDb = defineStore('db', () => {
    const db: Ref<Promise<IDBDatabase>> = ref(new Promise((resolve, reject) => {
        const req = window.indexedDB.open('ocdata');
        let loadExampleQuiz = false;
        req.onerror = (e) => reject(e);
        req.onsuccess = async () => {
            if (loadExampleQuiz) {
                const res = await fetch("/only-connect/Christmas Only Connect 2024.json");
                const json = await res.json();
                await saveQuizToDb(parseJson(json)!, req.result);
            }
            resolve(req.result);
        };
        req.onupgradeneeded = () => {
            req.result.onerror = (e) => console.error(e);
            const table = req.result.createObjectStore('quizes', {keyPath: 'id'});
            table.createIndex('name', 'name');
            table.createIndex('rounds', 'rounds');
            table.createIndex('created', 'created');
            table.createIndex('edited', 'edited');

            loadExampleQuiz = true;
        };
    }));
    
    return {db};
})

export default useDb;

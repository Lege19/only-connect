<script setup lang="ts">
import { loadAll } from '@/saveManager';
import { type Quiz } from '@/quizJson';
import useDb from '@/stores/db';
const db = useDb();
let quizes: Quiz[] = await await new Promise((resolve, reject) => {
    const attempt = () => {
        if (db.db) {
            resolve(loadAll(db.db))
        } else {
            setTimeout(() => attempt(), 100)
            console.log('failed attempt to get database')
        }
    };
    setTimeout(() => reject("db timed out"), 10000);
    attempt();
});
</script>

<template>
    <div class="save-manager">
        <div class="inner">
        </div>
    </div>
</template>
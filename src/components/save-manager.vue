<script setup lang="ts">
import { loadAll as loadAllQuizes } from '@/saveManager';
import { type Quiz } from '@/quizTypes';
import useDb from '@/stores/db';
const db = useDb();
let quizes: Quiz[] = await loadAllQuizes(await db.db);
</script>

<template>
    <div class="save-manager">
        <div class="inner">
        </div>
    </div>
</template>
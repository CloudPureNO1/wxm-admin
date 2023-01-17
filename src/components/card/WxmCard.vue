<template>
    <div class="wxm-card">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
    .wxm-card {
        border-radius: 4px;
        border: 1px solid var(--el-border-color-light);
        background-color: var(--el-fill-color-blank);
        overflow: auto;
        color: var(--el-text-color-primary);
        transition: var(--el-transition-duration);
        box-shadow: var(--el-box-shadow-light);
        padding: 10px;
    }
 
    </style>
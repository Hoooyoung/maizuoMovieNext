<template>
    <ul>
        <router-link to="/films/showingnow" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'hyactive':''">正在热映</li>
        </router-link>
        <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'hyactive':''">即将上映</li>
        </router-link>
    </ul>
</template>

<style lang="scss" scoped>
    ul {
        display: flex;
        line-height: 49px;
        li {
            flex:  1;
            text-align: center;
        }
    }
    .hyactive{
        color: orange;
        border-bottom: 1px solid orange;
    }
    
</style>
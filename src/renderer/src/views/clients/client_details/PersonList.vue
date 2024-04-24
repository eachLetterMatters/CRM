<template>
    <div class="gallery">
        <div>
            <div class="person">A</div>
            <div class="person">B</div>
            <div class="person">C</div>
            <div class="person">D</div>
            <div class="person">E</div>
            <div class="person">F</div>
        </div>
    </div>
</template>

<script>
export default {
    props:[],
};
</script>

<style scoped>

.gallery{
    width: 100%;
    height: 100%;
    background: red;
    display: flex;
    overflow-x: scroll;
    /* overflow-y: scroll ; */
}

.gallery div{
    width: 100%;
    display: grid;
    /* white-space: nowrap; */
    grid-template-columns: auto auto auto;
    grid-auto-flow: column;
    grid-gap: 20px;
    padding: 10px;
    flex: none;
    justify-content: start;
}
.gallery div .person{
    width: 200px;
    /* height: 200px; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
    background: yellow;
}

.gallery::-webkit-scrollbar{
    display: none;
}
</style>
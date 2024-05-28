<template>
    <AddActionForm
        v-if="showAddForm"
        @closeForm="toggleAddForm"
        v-bind:clientId="clientId"
    />
    <div style="height:100%; width:100%; ">
        <div class="title-bar">
            <div style="flex:1;">

            </div>
            <div style="flex:1;">
                <h1>Miejsce na akcje dla {{clientId}}</h1>
            </div>
            <div style="flex:1; align-items:center;">
                <button style="actionButton" @click="toggleAddForm">Dodaj akcje</button>
            </div>
        </div>
        <div v-for="(action, index) in actions" :key="index" class="note">
            {{ action.category }}  {{action.date}}  {{action.comment}}
        </div>
    </div>
</template>

<script>
import AddActionForm from './AddActionForm.vue'

export default {
    components:{
        AddActionForm
    },
    props : ["clientId"],
    data(){
        return{
            showAddForm: false,
            actions:[],
        }
    },
    methods:{
        toggleAddForm(){
            this.showAddForm = !this.showAddForm;
            this.getActions()
        },
        getActions(){
            window.api.getActions(this.clientId).then((actions) => {
                this.actions = actions;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    watch: {
        clientId: function (newVal, oldVal) {
            this.getActions();
        }
    },
    mounted(){
        // this.getActions();
    }
}
</script>

<style scoped>
.title-bar{
    width:100%;
    display:flex;
    justify-content: space-around;
    /* align-items: space-around; */
    background-color: red;
}
.actionButton{
  background: var(--dark-blue);
  border: transparent;
  padding: 5px 15px;
  border-radius: 35px;
}
</style>
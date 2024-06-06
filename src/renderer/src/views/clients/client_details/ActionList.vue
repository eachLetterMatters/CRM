<template>
    <AddActionForm
        v-if="showAddForm"
        @closeForm="toggleAddForm"
        v-bind:clientId="clientId"
    />
    <div style="height:100%; width:100%; overflow-y:scroll;">
        <!-- TITLE BAR WITH ADD BUTTON -->
        <div class="title-bar">
            <div style="flex:1;">

            </div>
            <div style="flex:1; display:flex; align-items: center; justify-content:center;">
                <h1 style="font-size:20px; color: grey;">Akcje</h1>
            </div>
            <div style="flex:1; display:flex; align-items:center; justify-content:flex-end;">
                <button class="add-action-button" @click="toggleAddForm">+</button>
            </div>
        </div>
        <!-- ACTION LIST -->
        <ActionItem
          v-for="(action, index) in actions"
          :key="index"
          v-bind:action="action"
        >
            <div
                class="trash-button"
                v-if="allowEdit"
                @click="removeAction(action.id)"
            >
            <img
                class="icon"
                src="../../../assets/icons/ic--trash.svg"
                style="height: 25px"
            />
            </div>
        </ActionItem>
    </div>
</template>

<script>
import AddActionForm from './AddActionForm.vue'
import dayjs from 'dayjs'
import customParseFOrmat from 'dayjs/plugin/customParseFormat'
import ActionItem from '../../../components/ActionItem.vue'

export default {
    components:{
        AddActionForm,
        ActionItem,
    },
    props : ["clientId", "allowEdit"],
    data(){
        return{
            showAddForm: false,
            actions:[],
        }
    },
    computed:{
    },
    methods:{
        toggleAddForm(){
            this.showAddForm = !this.showAddForm;
            this.getActions()
        },
        getActions(){
            window.api.getActions(this.clientId).then((actions) => {
                this.actions = actions;
                // for(a of this.actions){
                //     console.log(a.date);
                // }
            }).catch((err) => {
                console.log(err);
            });
        },
        removeAction(id) {
            this.$confirm.require({
                message: "Czy na pewno chcesz usunąć tę akcję?",
                header: "Potwierdzenie",
                acceptLabel: "Tak",
                rejectLabel: "Nie",
                // icon: "pi pi-exclamation-triangle",
                accept: () => {
                // Action to perform on confirmation
                // window.api.removeClient(id);
                // this.$router.push({ name: "clients" });
                // console.log("Deleting person with id: " + id);
                window.api.removeAction(id);
                this.getActions();
                },
                reject: () => {
                    console.log("Not Deleted");
                },
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
}
.add-action-button{
  /* background: var(--dark-blue); */
  background: transparent;
  border: transparent;
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 35px;
  margin-right: 5px;
  border: 3px solid #f4f4f4;
}
.add-action-button:hover{
  /* background: var(--dark-blue); */
  background: var(--dark-blue);
  transition: 0.5s;
    /* transform: translatey(3px); */
}
.action{
    /* background-color: #ffffff33; */
    /* background: linear-gradient(to right,#cfe3ef, white); */
    background: transparent;
    border: 3px solid var(--dark-white);
    /* background: transparent; */
    border-radius: 35px;
    width: 96%;
    margin: 2% 2%;
    position: relative;
    height: 50px;
    display: flex;
}

/* .action:hover {
  background: #ffffff77;
} */

.trash-button {
  position: absolute;
  /* background: var(--light-red); */
  border-radius: 50%;
  /* z-index: 100; */
  top: 5px;
  right: 5px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--dark-white);
}
.trash-button:hover {
  background: var(--dark-red);
  transition: 1s;
  cursor: pointer;
}

</style>
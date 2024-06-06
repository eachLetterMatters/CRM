<template>
  <AddQuicknoteForm
    v-if="showAddForm"
    @closeForm="toggleAddForm"
  />
  <div class="view-container">
    <div class="left">
      <div style="display:flex;width:100%;">
        <div style="flex:1">
          {{filterOption}}
        </div>
        <div style="flex:1; display:flex; align-items:center; justify-content: center;">
          <p style="font-size:18px;">Akcje do wykonania</p>
        </div>
        <div style="flex:1">
          <!-- <SelectButton v-model="filterOption" :options="filterOptions" aria-labelledby="basic" :class="$style.select-button"/> -->
        </div>
      </div>
        <ActionItem
          v-for="(action, index) in actions"
          :key="index"
          v-bind:action="action"
          @click="openClientDetails(action.client_id)"
        />
    </div>
    <div class="right">
      <ConfirmDialog :class="$style.myinput" />
      <p style="font-size:18px;">Szybkie notatki</p>
      <div
        v-for="(note, index) in notes"
        :key="index"
        class="note"
        @click="deleteNote(note.id)"
      >
        {{ note.content }}
      </div>
      <button class="add-button" @click="toggleAddForm">+</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import AddQuicknoteForm from './AddQuicknoteForm.vue';
// import SelectButton from 'primevue/selectbutton';
import ActionItem from '../../components/ActionItem.vue';

export default {
  data() {
    return {
      notes: [],
      actions: [],
      showAddForm: false,
      filterOption: null,
      filterOptions: ["1 day", "3 day", "7 day"]
    };
  },
  components:{
    AddQuicknoteForm,
    // SelectButton,
    ActionItem,
  },
  methods: {
    getNotes() {
      window.api
        .getNotes()
        .then((notes) => {
          this.notes = notes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sortActionsByDate() {
      dayjs.extend(customParseFormat);
      this.actions.sort((a, b) => {
        const dateA = dayjs(a.date, "YYYY-MM-DD-HH-mm");
        const dateB = dayjs(b.date, "YYYY-MM-DD-HH-mm");
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;
        return 0; // dates are equal
      });
    },
    getAllActions() {
      window.api.getAllActions()
        .then((actions) => {
          this.actions = actions;
          // dayjs.extend(customParseFOrmat);
          // for (let i = 0; i < this.actions.length; i++) {
          //   const newFormat = dayjs(
          //     this.actions[i].date,
          //     "YYYY-MM-DD-HH-mm"
          //   ).format("DD.MM.YYYY HH:mm");
          //   this.actions[i].date = newFormat;
          // }
          this.sortActionsByDate();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleAddForm(){
      this.showAddForm = !this.showAddForm;
      this.getNotes();
    },
    deleteNote(id) {
      this.$confirm.require({
        message: "Czy na pewno chcesz usunąć tą notatkę?",
        header: "Potwierdzenie",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        // icon: "pi pi-exclamation-triangle",
        accept: () => {
          // Action to perform on confirmation
          window.api.removeNote(id);
          this.getNotes();
        },
        reject: () => {
          console.log("Not Deleted");
        },
      });
    },
    openClientDetails(clientId) {
      this.$router.push({
        name: "clientdetails",
        params: { id: clientId },
      });
    },
  },
  mounted() {
    this.getNotes();
    this.getAllActions();
  },
};
</script>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  /* background: blue; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(76% - 24px);
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.5%;
  border: 3px solid var(--dark-white);
  background: #ffffff44;
  /* background: red; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 8px 16px 16px;
  overflow-y:scroll;
  /* margin: 16px 0px 16px 0px; */
}

.left::-webkit-scrollbar {
  display: none;
}


.right {
  display: flex;
  flex-direction: column;
  /* background: green; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(24% - 24px);
  align-items: center;
  justify-content: flex-start;
  border: 3px solid var(--dark-white);
  background: #ffffff33;
  /* background: yellow; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 16px 16px 8px;
  /* margin: 16px 0px 16px 0px; */
  position: relative;
  padding-top: 1.5%;
}

.note {
  border: 2px solid #ffffff11;
  margin: 5px 10px 5px 10px;
  padding: 5px;
  text-align: center;
  width:100%;
}

.note:hover {
  background: #ffffff77;
}

.add-button {
  background: var(--dark-blue);
  border: transparent;
  width: 40px;
  height:40px;
  border-radius: 35px;
  position: absolute;
  bottom: 15px;
  right: 50% - 20px;
  color: white;
}

.add-button:hover{
    transform: translatey(-5px);
    transition: 0.5s;
}
</style>

<style module>
.myinput {
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  border-radius: 20px;
}

.myinput button {
  /* background-color: #28a745; */
  margin: 10px 5px 10px 5px;
  padding: 5px;
}

/* .select-button select{
  padding:10px;
  background-color: red;
} */
</style>
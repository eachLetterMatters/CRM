<template>
  <AddPersonForm
    v-if="showAddForm"
    @closeForm="toggleAddForm"
    v-bind:clientId="clientId"
  />

  <div class="gallery">
    <div class="list-container">
      <!-- DIV PER EACH PERSON -->
      <div v-for="(person, index) in persons" :key="index" class="person">
        <img
          class="icon"
          src="../../../assets/icons/ic--person.svg"
          style="height: 30px"
        />
        <p>{{ person.name }}</p>
        <p>{{ person.surname }}</p>

        <div style="display: flex">
          <img class="icon" src="../../../assets/icons/ic--phone.svg" />
          <p>{{ person.phone_number }}</p>
        </div>

        <div style="display: flex">
          <img class="icon" src="../../../assets/icons/ic--email.svg" />
          <p>{{ person.email }}</p>
        </div>

        <!-- DELETE BUTTON -->
        <div
          class="trash-button"
          v-if="allowEdit"
          @click="removePerson(person.id)"
        >
          <img
            class="icon"
            src="../../../assets/icons/ic--trash.svg"
            style="height: 25px"
          />
        </div>
      </div>
      <!-- ADD A NEW PERSON BUTTON -->
      <div class="person" @click="toggleAddForm">
        <div class="add-button">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import AddPersonForm from "./AddPersonForm.vue";

export default {
  components: { AddPersonForm },
  props: ["clientId", "allowEdit"],
  data() {
    return {
      persons: [],
      showAddForm: false,
    };
  },
  methods: {
    toggleAddForm(){
      this.showAddForm = !this.showAddForm;
      this.getPersons();
    },
    // addPerson() {
    //   // console.log("Person Added");
    //   // window.api.addPerson(this.clientId);
    //   // this.getPersons();
    // },
    getPersons() {
      // console.log("Searching for id: " +  this.clientId)
      window.api
        .getPersons(this.clientId)
        .then((persons) => {
          this.persons = persons;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removePerson(id) {
      this.$confirm.require({
        message: "Czy na pewno chcesz usunąć te dane?",
        header: "Potwierdzenie",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        // icon: "pi pi-exclamation-triangle",
        accept: () => {
          // Action to perform on confirmation
          // window.api.removeClient(id);
          // this.$router.push({ name: "clients" });
          console.log("Deleting person with id: " + id);
          window.api.removePerson(id);
          this.getPersons();
        },
        reject: () => {
          console.log("Not Deleted");
        },
      });
      // confirm("Test")
      // store.emitter.emit("showDialog", { a: "test" });

      // window.api.removeClient(id);
      // this.$router.push({ name: "clients" });
    },
  },
  watch: {
    clientId: function (newVal, oldVal) {
      // watch it
      //   console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.getPersons();
    },
  },
  mounted() {
    // this.getPersons();
  },
  beforeUpdate() {
    // console.log("Before update is called");
    // this.getPersons();
  },
};
</script>

<style scoped>
.gallery {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  /* overflow-y: scroll ; */
}

.list-container {
  width: 100%;
  display: grid;
  /* white-space: nowrap; */
  grid-template-columns: auto auto auto;
  grid-auto-flow: column;
  grid-gap: 5px;
  padding: 10px;
  flex: none;
  justify-content: start;
}
.gallery div .person {
  width: 195px;
  /* height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  /* background: transparent; */
  background: linear-gradient(#cfe3ef, white);
  /* background: linear-gradient(white,var(--light-background)); */
  /* background: white; */
  /* padding: 8px;  */
  border-radius: 35px;
  color: var(--dark-background-1);
  position: relative;
}

.gallery::-webkit-scrollbar {
  display: none;
}

.icon {
  filter: invert(17%) sepia(32%) saturate(3234%) hue-rotate(176deg)
    brightness(94%) contrast(96%);
}

.add-button {
  width: 65px;
  height: 65px;
  background: var(--dark-white);
  border-radius: 50%;
  color: white;
  line-height: 65px;
  text-align: center;
  font-size: center;
  font-size: 23px;
  z-index: 99;
  cursor: pointer;
}
.add-button:hover {
  background: var(--theme-color);
  transition: 1s;
}

.trash-button {
  position: absolute;
  /* background: var(--light-red); */
  border-radius: 50%;
  /* z-index: 100; */
  top: 15px;
  right: 50% - 20px;
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
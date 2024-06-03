<template>
  <div class="view-container">
    <div class="left">
      <div class="top">
        <!-- ========  CLIENT DATA ========= -->

        <h1 class="title-name" :contenteditable="edit" id="client_name">
          {{ client.name }}
        </h1>
        <div style="display: flex">
          <img class="icon" src="../../../assets/icons/ic--phone.svg" />
          <p :contenteditable="edit" id="client_phone_number">
            {{ client.phone_number }}
          </p>
        </div>
        <div style="display: flex" v-if="client.www !== null || edit === true">
          <img class="icon" src="../../../assets/icons/ic--www.svg" />
          <p :contenteditable="edit" id="client_www">
            {{ client.www }}
          </p>
        </div>
        <div style="display: flex" v-if="client.fb !== null || edit === true">
          <img class="icon" src="../../../assets/icons/ic--facebook.svg" />
          <p :contenteditable="edit" id="client_fb">
            {{ client.fb }}
          </p>
        </div>
        <div style="display: flex" v-if="client.address !== null || edit === true">
          <img class="icon" src="../../../assets/icons/ic--address.svg" />
          <p :contenteditable="edit" id="client_address">
            {{ client.address }}
          </p>
        </div>

        <div style="display:flex; align-items:center;">
          <div v-if="edit" style="display:flex; margin-right: 10px;">
            <InputSwitch v-model="client.is_active"/>
          </div>
          <div v-if="client.is_active" style="display: flex;">
            <img class="icon" src="../../../assets/icons/bulb-on.svg" />
            <p>aktywny</p>
          </div>
          <div v-else style="display: flex">
            <img class="icon" src="../../../assets/icons/bulb-off.svg" />
            <p>nieaktywny</p>
          </div>
        </div>

        <div style="display:flex; align-items:center;" v-if="edit">
          <div v-if="edit" style="display:flex; margin-right: 10px;">
            <InputSwitch v-model="client.is_commercial"/>
          </div>
          <div v-if="client.is_commercial" style="display: flex;">
            <img class="icon" src="../../../assets/icons/company.svg" />
            <p>firma</p>
          </div>
          <div v-else style="display: flex">
            <img class="icon" src="../../../assets/icons/government.svg" />
            <p>instytucja</p>
          </div>
        </div>
        <!-- ========   EDIT BUTTONS ========= -->

        <div
          class="edit-button"
          @click="toggleEdit"
          :class="{ 'edit-active': edit }"
        >
          <img
            class="icon"
            src="../../../assets/icons/ic--edit.svg"
            style="height: 25px"
          />
        </div>

        <div class="ok-button" v-if="edit" @click="updateClient">
          <img
            class="icon"
            src="../../../assets/icons/ic--ok.svg"
            style="height: 25px"
          />
        </div>

        <div class="trash-button" v-if="edit" @click="removeClient(client.id)">
          <img
            class="icon"
            src="../../../assets/icons/ic--trash.svg"
            style="height: 25px"
          />
        </div>

        <ConfirmDialog :class="$style.myinput" />
      </div>
      <div class="bottom">
        <!-- ========   PERSON LIST  ========= -->
        <PersonList :clientId="client.id" :allowEdit="edit"/>
      </div>
    </div>
    <!-- HISTORY AND ACTIONS SECTION -->
    <div class="right">
      <div style="display: flex; height:50%; width:100%; border-bottom: 3px solid var(--dark-white);">
        <AddRatingForm
          v-if="showAddForm"
          @closeForm="toggleAddForm"
          :clientId="client.id"
        />
        <Chart type="line" :data="chartData" :options="chartOptions" style="width:100%; height:100%" @elementClick="onElementClick"/>
        <button class="actionButton" @click="toggleAddForm">+</button>
      </div>
      <div style="display: flex; height:50%; width:100%; justify-content:center; align-items: center;">
        <ActionList :clientId="client.id" :allowEdit="edit"/>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from "./PersonList.vue";
import { store } from "../../..//store/store";
// import { shell} from 'electron'
// const { shell } = require('electron')
import InputSwitch from 'primevue/inputswitch';
import Chart from 'primevue/chart';
import ActionList from './ActionList.vue';
import AddRatingForm from './AddRatingForm.vue';

export default {
  components: {
    PersonList,
    InputSwitch,
    Chart,
    ActionList,
    AddRatingForm
  },
  data() {
    return {
      client: {},
      edit: false,
      showAddForm: false,
      chartData:{
        labels: ['2008', '2010', '2014', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: 'Ocena',
                fill: true,
                borderColor: '#5eead5',
                yAxisID: 'y',
                tension: 0.4,
                data: [3, 2, 1, 1, 2, 4, 6]
            }
        ]
      },
      chartOptions:{
        scale: {
          ticks: {
            precision: 0
          }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false // Disable the legend
            },
            title: {
                display: true,
                text: 'Historia współpracy', // Set the title text
                font: {
                    size: 20, // Set the font size
                    color: '#054061',
                    family: 'Poppins',
                },
                padding: {
                    top: 10,
                    bottom: 10
                }
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
        }
      }

    };
  },
  methods: {
    // openInBrowser(link){
    //     window.api.openInBrowser(link);
    //     // shell.openExternal('https://' + link);
    // },
    getClientData(){
      window.api
        .getClient(this.$route.params.id)
        .then((client) => {
          // console.log(client);
          this.client = client;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    updateClient() {
      let name = document.getElementById("client_name").innerText;
      if (name.trim().length === 0) name = null;
      let phone_number = document.getElementById("client_phone_number").innerText;
      if (phone_number.trim().length === 0) phone_number = null;
      let www = document.getElementById("client_www").innerText;
      if (www.trim().length === 0) www = null;
      let fb = document.getElementById("client_fb").innerText;
      if (fb.trim().length === 0) fb = null;
      let address = document.getElementById("client_address").innerText;
      if (address.trim().length === 0) address = null;
      // console.log(name + " " + phone_number + " " + www + " " + fb);
      // console.log(this.client)
      const updated_client = {
        name: name,
        phone_number: phone_number,
        www: www,
        fb: fb,
        address: address,
        is_active: this.client.is_active,
        is_commercial: this.client.is_commercial
      };
      window.api.updateClient(this.client.id, updated_client);
      this.edit = false;
      this.getClientData();
    },

    removeClient(id) {
      this.$confirm.require({
        message: "Czy na pewno chcesz usunąć te dane?",
        header: "Potwierdzenie",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        // icon: "pi pi-exclamation-triangle",
        accept: () => {
          // Action to perform on confirmation
          window.api.removeClient(id);
          this.$router.push({ name: "clients" });
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
    toggleAddForm(){
      this.showAddForm = !this.showAddForm;
    },
    // event handler enabling to delete chart points
    onElementClick(event) {
      const chart = event.chart;
      const element = chart.getElementsAtEventForMode(
        event.native,
        'nearest',
        { intersect: true },
        true
      );

      if (element.length) {
        const datasetIndex = element[0].datasetIndex;
        const dataIndex = element[0].index;

        console.log("Deleting chart")
        // Remove the clicked data point
        this.chartData.datasets[datasetIndex].data.splice(dataIndex, 1);
        this.chartData.labels.splice(dataIndex, 1);

        // Update the chart
        chart.update();
      }
    },
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.getClientData();
  },
};
</script>

<style scoped>
.left {
  display: flex;
  /* background: yellow; */
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right {
  display: flex;
  flex-direction: column;
  /* background: #ffffff33; */
  width: 48%;
  align-items: center;
  justify-content: center;
  margin: 1% 1% 1% 1%;
  border: 3px solid var(--dark-white);
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
}

.top {
  display: flex;
  /* background: green; */
  height: 48%;
  width: 98%;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--dark-white);
  /* background: #ffffff33; */
  border-top-left-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
  /*  */

  flex-direction: column;

  position: relative;
}

.bottom {
  display: flex;
  /* background: blue; */
  height: 48%;
  width: 98%;
  align-items: center;
  justify-content: center;

  border: 3px solid var(--dark-white);
  /* background: #ffffff44; */
  border-bottom-left-radius: 35px;
  color: var(--dark-background-1);
  margin: 1% 1% 1% 1%;
}

.title-name {
  font-size: 48px;
}

.icon {
  filter: invert(17%) sepia(32%) saturate(3234%) hue-rotate(176deg)
    brightness(94%) contrast(96%);
}

.edit-button {
  position: absolute;
  /* background: var(--dark-white); */
  border-radius: 50%;
  /* z-index: 100; */
  top: 15px;
  left: 15px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--dark-white);
}

.edit-button:hover {
  background: var(--theme-color);
  transition: 1s;
  cursor: pointer;
}

.ok-button {
  position: absolute;
  background: var(--light-mint);
  border-radius: 50%;
  /* z-index: 100; */
  top: 15px;
  left: 70px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--dark-white);
}
.edit-active {
  background: var(--light-blue);
}

.ok-button:hover {
  background: var(--dark-mint);
  transition: 1s;
  cursor: pointer;
}

.trash-button {
  position: absolute;
  /* background: var(--light-red); */
  border-radius: 50%;
  /* z-index: 100; */
  top: 15px;
  right: 15px;
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

[contenteditable] {
  /* border: 1px solid gray; Set a default border color */
  /* padding: 8px; */
  outline: none; /* Remove the default focus outline */
}

[contenteditable]:focus {
  border: 1px solid blue; /* Change border color when focused */
  /* border-radius: 50%; */
}

/* .p-confirmdialog-acceptbutton {
  background-color: #28a745 !important;
  border-color: #28a745 !important; 
  color: white !important; 
} */

.top p {
  /* background: red; */
  min-width: 100px;
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

/* .myinput button.p-confirmdialog-acceptbutton{
  background-color: #28a745 !important;
  border-color: #28a745 !important; 
  color: white !important; 
} */
</style>
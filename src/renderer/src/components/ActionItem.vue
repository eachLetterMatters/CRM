<template>
    <div class="action">
        <div class="date" :class="backgroundClass">
          <p style="white-space: nowrap;">{{ formattedDate }}</p>
        </div>
        <div style="">
          <p>{{ action.category }}</p>
          <p>{{ action.comment }}</p>
        </div>
        <slot></slot>
    </div>  
</template>

<script>
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default {
  props: ["action"],
  methods: {
    openClientDetails(client_id) {
      this.$router.push({
        name: "clientdetails",
        params: { id: client_id},
      });
    },
  },
  computed:{
    backgroundClass(){
        if (dayjs().isSame(dayjs(this.action.date, 'YYYY-MM-DD-HH-mm'), 'day')) {
            return 'background-today'
        } else return 'background-default'
    },
    formattedDate(){
        dayjs.extend(customParseFormat);
        return dayjs(this.action.date,"YYYY-MM-DD-HH-mm").format("DD.MM.YYYY HH:mm");
    }
  }
};
</script>

<style scoped>

.action {
  /* background: linear-gradient(to right,#cfe3ef, var(--dark-white)); */
  background: transparent;
  border: 3px solid var(--dark-white);
  border-radius: 35px;
  width: 96%;
  margin: 1% 2%;
  position: relative;
  height: 50px;
  display: flex;
  overflow: hidden;
}

.action:hover{
  background: #ffffff55;
}

.date{
    padding:20px;
    margin-right:20px; 
    border-radius: 35px; 
    display: flex; 
    justify-content:center; 
    align-items: center;
}

.background-today{
    background: var(--light-mint);
}

.background-default{
    background: var(--dark-white);
}
</style>
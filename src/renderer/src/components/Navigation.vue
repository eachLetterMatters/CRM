<template>
  <header>
    <nav>
      <div class="part left"></div>
      <div class="part middle">
        <img class="logo" src="../assets/logo.png" alt="Odkryj Pomorze" />
      </div>
      <div class="part right">
        <ul class="navigation">
          <li>
            <router-link class="link" to="/">
              <div style="display: flex">
                <img class="icon" src="../assets/icons/ic--baseline-home.svg" />
                Pulpit
              </div>
            </router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'clients' }">
              <div style="display: flex">
                <img class="icon" src="../assets/icons/ic--person.svg" />
                Klienci
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 
            <ul class="navigation">
                <li><router-link class="link" to="/">home.js</router-link></li>
                <li><router-link class="link" :to="{ name: 'clients' }">habits.js</router-link></li>
            </ul> -->
    </nav>
  </header>
</template>

<script>
export default {
  components: {},
  methods: {},
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  height: 12%;
}

nav {
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  border-image: linear-gradient(to right, var(--dark-mint), var(--dark-blue)) 1;
  border-bottom: 5px solid transparent;
  /* padding-right: 10px; */
  /* border-image: linear-gradient(to right, var(--mainColor), var(--background1)) 1; */
}

.logo {
  /* margin: 15px; */
  height: 50px;
}

.part {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  width: 37%;
}

.middle {
  width: 26%;
}

.right {
  width: 37%;
}

.navigation {
  /* padding-right: 30px;/ */
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  list-style: none;
  text-decoration: none;
}

.link {
  font-weight: 600;
  /* color: #969696; */
  list-style: none;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  padding: 17px;
  background-color: var(--dark-white);
  border-radius: 50px;
  margin-right: 12px;
}

.link:hover {
  background-color: var(--dark-mint);
  transition: 1s;
}

li a.router-link-exact-active {
  background-color: var(--light-mint);
  /* color: var(--mainTextColor); */
}

.icon {
  height: 20px;
  margin-right: 5px;
  filter: invert(17%) sepia(32%) saturate(3234%) hue-rotate(176deg) brightness(94%) contrast(96%);
}
</style>

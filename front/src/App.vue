<script>
import Lesson from './Lesson'
import Checkout from './Checkout'

export default {
  name: "app",
  components: {
    Lesson, Checkout
  },
  data() {
    return {
      searchRESUTEXT: "",
      isBtn: false,
      MESSAGE: false,
      listOfProduct: [],
      lessonsLIST: [],
      isproduct: 10,
      toShowSelectedProduct: [],
      isAscDec: "asc",
      ascDecs: 1,
      sortSelected: "name",
      searcedhValues: "",
      form: {
        name: "",
        number: ""
      },
      imageSRC: ""
    };
  },
  computed: {
    selectedText: {
      get() {
        return this.sortSelected;
      },
      set(newValue) {
        this.sortSelected = newValue;
        this.sortList();
      }
    },
    ascDec: {
      get() {
        return this.ascDecs;
      },
      set(newValue) {
        this.isAscDec = newValue == 1 ? "asc" : "dsc";
        this.sortByAscDec();
      }
    }
  },
  created() {
    this.sortByAscDec();
    this.getLessonsList();
    this.image();
  },
  methods: {
    image() {
      fetch("http://localhost:3000/lesson-images", {
        method: "GET"
      })
        .then(res => {
          let data = res.json();
          return data;
        })
        .then(res => {
          this.imageSRC = res;
          console.log(this.imageSRC);
        });
    },
    searchByText() {
      if (this.searchRESUTEXT.length) {
        fetch(`http://localhost:3000/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: this.searchRESUTEXT })
        })
          .then(res => {
            let data = res.json();
            return data;
          })
          .then(res => {
            this.listOfProduct = [];
            this.listOfProduct = res;
          });
      } else {
        this.getLessonsList();
      }
    },
    deleteAllOrders() {
      fetch(`http://localhost:3000/orders`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type"
        }
      })
        .then(res => {

          this.getLessonsList();
          return res;
        })
        .catch(res1 => {

        });
    },
    deleteTHELessons(product, index) {
      fetch(`http://localhost:3000/lessons/${product._id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type"
        }
      })
        .then(res => {
          console.log("");
          this.getLessonsList();
          return res;
        })

    },
    getLessonsList() {
      fetch("http://localhost:3000/lessons", {
        method: "GET"
      })
        .then(res => {
          let data = res.json();
          return data;
        })
        .then(res => {
          this.listOfProduct = [];
          this.listOfProduct = res;
          console.log(this.listOfProduct);
        })
        .catch(res1 => {
          console.log("errorsss");
        });
    },
    getLessonsOrders() {
      fetch("http://localhost:3000/orders", {
        method: "GET"
      })
        .then(res => {
          let data = res.json();
          return data;
        })
        .then(res => {
          this.lessonsLIST = [];
          this.lessonsLIST = res;
          console.log(res);
        });
    },
    sortByAscDec() {
      if (this.isAscDec == "asc") {
        this.sortList();
      } else {
        this.listOfProduct = this.listOfProduct.reverse();
      }
    },
    sortList() {
      this.listOfProduct.sort((a, b) => {
        let B1 =
          typeof a == "string"
            ? b[this.sortSelected].toLowerCase()
            : b[this.sortSelected];
        let A1 =
          typeof a == "string"
            ? a[this.sortSelected].toLowerCase()
            : a[this.sortSelected];
        if (A1 < B1) {
          return -1;
        }
        if (A1 > B1) {
          return 1;
        }
        return 0;
      });
      // this.sortByAscDec();
    },
    addToCart(product, index) {
      console.log(this.form, product);
      if (this.form.name && this.form.number) {
        this.MESSAGE = false;
        let order = {
          name: this.form.name,
          phoneNumber: this.form.number,
          lessonId: product._id,
          spaces: product.space,
          lessonName: product.name
        };
        fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        })
          .then(res => {
            console.log(res);
            this.getLessonsList();
            this.getLessonsOrders();
          });
      } else {
        this.MESSAGE = true;
      }
    },
    remove(product, cart) { }
  }
};
</script>

<template>
  <div>
    <div id="app">
      <nav class="d-flex text-light navbar bg-primary" data-bs-theme="dark">
        Sort
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortBy" v-model="selectedText" checked id="subject"
            :value="'name'" />
          <label class="form-check-label" for="subject">
            Subject
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortBy" v-model="selectedText" id="location"
            :value="'location'" />
          <label class="form-check-label" for="location">
            Location
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortBy" v-model="selectedText" id="price" :value="'price'" />
          <label class="form-check-label" for="price">
            Price
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortBy" v-model="selectedText" id="availability"
            :value="'spaces'" />
          <label class="form-check-label" for="availability">
            Available
          </label>
        </div>
        <div class="mt-3">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ascDec" v-model="ascDec" id="ascen" :value="1" />
            <label class="form-check-label" for="ascen">
              Ascending Order
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ascDec" v-model="ascDec" id="descen" :value="2" />
            <label class="form-check-label" for="descen">
              Descending Order
            </label>
          </div>
        </div>
      </nav>
      <div id="app" class="flex-container">
        <div class="content">
          <h1>Lesson Cart</h1>

          <div class="container mx-auto mt-4">
            <div class="form-group d-flex">
              <input type="email" class="form-control" id="search" placeholder="Search for Subject"
                v-model="searchRESUTEXT" />
              <button class="btn btn-primary mx-1" @click="searchByText()">
                Search
              </button>
            </div>
          </div>
          <Lesson :listOfProduct="listOfProduct" :addToCart="addToCart" :deleteTHELessons='deleteTHELessons' />
          <Checkout :lessonsLIST="lessonsLIST" :remove="remove" :deleteTHELesson="deleteTHELessons" :MESSAGE="MESSAGE"
            :form="form" />
        </div>
      </div>
    </div>
  </div>
</template>



<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.flex-container {
  display: -webkit-flex;
  display: flex;
  background-color: red;
  min-height: 100%;
}

.sidenav {
  background-color: #ffdddd;
  -webkit-flex: 1;
  flex: 1;
}

.content {
  background-color: rgb(248, 253, 255);
  padding: 10px;
  -webkit-flex: 5;
  flex: 5;
  height: 2000px;
}



.card {
  max-height: 250px;
  height: 250px;
  width: 200px;
  margin: 5px 5px;
}

.card-body-content {
  height: 180px;
}

.card-body {
  padding: 0.5rem;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.form-check {
  justify-content: space-between;
  display: flex;
  padding-left: 30px;
}
</style>

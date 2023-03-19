<script>
export default {
  data() {
    return {
      imageSRC: "",
      isBtn: false,
    }
  },
  props: ['listOfProduct', 'addToCart', 'deleteTHELessons'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props)
  }
}


</script>

<template>
  <div>
    <div class="d-flex flex-wrap w-100 justify-content-between">
      <div class=" me-1 card" v-for="(product, index) in listOfProduct">
        <div class=" card-body card-h">
          <!-- <h5 class="card-title">{{ product.name }}</h5> -->
          <img :src="imageSRC" class="card-img-top" :alt="imageSRC" />
          <div class="mt-2 card-body-content d-flex flex-column justify-content-between">
            <div class="mt-2 ">
              <h6 class="card-subtitle mb-2 text-muted">
                <span class="text-dark"> Name Of Lesson: </span>
                {{ product.name }}
              </h6>
              <h6 class="card-subtitle mb-2 text-muted">
                <span class="text-dark"> Space : </span>
                {{ product.space }}
              </h6>
              <h6 class="card-subtitle mb-2 text-muted">
                <span class="text-dark">Price:</span> {{ product.price }}
              </h6>
              <h6 class="card-subtitle mb-2 text-muted">
                <span class="text-dark"> Place: </span>{{ product.location }}
              </h6>
            </div>
            <div>
              <button class="btn btn-success" :disabled="isBtn" @click="addToCart(product, index)">
                Add to cart
              </button>
              <button class="btn btn-danger" @click="deleteTHELessons(product, index)">
                Delete the Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

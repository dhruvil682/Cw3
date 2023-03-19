<script setup>
defineProps({
    lessonsLIST: {
    type: Array,
    required: true
  },
  remove: {
    type: Function,
    required: true
  },
  deleteTHELessons: {
    type: Function,
    required: true
  }
})
</script>
<template>
  <div>
    <h3 class="mt-3" v-if="lessonsLIST.length">Shopping Cart</h3>
        <div
          class="d-flex flex-wrap w-100 justify-content-between"
          v-if="lessonsLIST.length"
        >
          <div class=" me-1 card" v-for="(product, index) in lessonsLIST">
            <div class="card-body">
              <img :src="product.img" class="card-img-top" alt="..." />
              <div class="mt-2 d-flex flex-column justify-content-between">
                <div class="mt-2 ">
                  <h6 class="card-subtitle mb-2 text-muted">
                    User Name: {{ product.name }}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    lesson Name: {{ product.lessonName }}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    Phone Number: {{ product.phoneNumber }}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                    No. of Spaces : {{ product.spaces }}
                  </h6>
                </div>
                <div>
                  <button
                    class="btn btn-primary  "
                    :disabled="isBtn"
                    @click="remove(product, index)"
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3>User Details</h3>
        <h6 class="text-danger" v-if="MESSAGE">
          Please Enter your User Detail
        </h6>
        <form class="mt-3">
          Name:
          <input
            type="text"
            v-model="form.name"
            class="form-group"
            placeholder="Name"
          />
          Phone Number:
          <input
            type="number"
            v-model="form.number"
            class="form-group"
            placeholder="Phone"
          />
          <button class="btn btn-primary">Checkout</button>
        </form>
      </div>
</template>
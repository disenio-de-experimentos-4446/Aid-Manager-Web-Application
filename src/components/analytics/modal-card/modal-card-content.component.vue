<script>
import { AnalyticsService } from "@/services/analytics.service.js";

export default {
  name: "modal-card-content",
  props: {
    selectedCard: {
      type: String,
      required: false
    },
    Data: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'update'], // Add 'update' to the list of emitted events
  data() {
    return {
      hasUpdated: false,
      analyticsService: new AnalyticsService(), // Initialize the AnalyticsService
      currentData: {}, // Initialize currentData as an empty object
      expectedData: {}, // Initialize expectedData as an empty object

      analytic: this.Data.find(analytic => analytic.title === this.selectedCard), // Find the analytic data for the selected card
      Current1: 0,
      Expected1: 0,
      Current2: 0,
      Expected2: 0,
      Current3: 0,
      Expected3: 0,
      Current4: 0,
      Expected4: 0,
      Current5: 0,
      Expected5: 0,
      Current6: 0,
      Expected6: 0,
      Current7: 0,
      Expected7: 0,
      Current8: 0,
      Expected8: 0,
      Current9: 0,
      Expected9: 0,
      Current10: 0,
      Expected10: 0,
      Current11: 0,
      Expected11: 0,
      Current12: 0,
      Expected12: 0,
      counter: 0,

    }
  }, async created(){
      console.log(this.analytic)
    for (let i = 0; i < this.analytic.current.length; i++) {
      this[`Current${i+1}`] = this.analytic.current[i];
    }

    for (let i = 0; i < this.analytic.expected.length; i++) {
      this[`Expected${i+1}`] = this.analytic.expected[i];
    }

    if(this.selectedCard === 'statistics')
    {
      let current3 = (this.Current2 - this.Current1);
      let expected3 = (this.Expected2 - this.Expected1);
      this.Current3 = current3;
      this.Expected3 = expected3;
      console.log(current3)
    }

  },
  methods: {
    closeModal() {
      if(this.selectedCard === 'statistics')
      {
        let current3 = (this.Current2 - this.Current1);
        let expected3 = (this.Expected2 - this.Expected1);
        this.Current3 = current3;
        this.Expected3 = expected3;
        console.log(current3)
      }
      this.$emit('close');
      this.$emit('update');
      // Emit the 'update' event when the "Update" button is clicked
    },
    async handleUpdateClick(projectId,id, data) {
      console.log("ProjectId", projectId, id, "DATA", data);
      if (data !== null || id !== null || projectId !== null) {
        // Call the updateAnalytics method from the AnalyticsService with the updated data
        try {
          await this.analyticsService.updateAnalytics(projectId,id, data).then(response => {
            console.log('Updated analytic:', response);
            this.closeModal();
          });
        }catch (e) {
          console.error('Error updating graphic:', e);
        }
      }
    },
    onUpdate() {

      console.log(this.selectedCard)
      this.hasUpdated = true;
      let newData = {
        id: this.analytic.id,
        title: this.analytic.title,
        description: this.analytic.description,
        cost: this.analytic.cost,
        progress: this.analytic.progress,
      };
      if (this.selectedCard === 'progress') {
        newData.current = [
          this.Current1,
          this.Current2,
          this.Current3,
          this.Current4,
          this.Current5,
          this.Current6,
          this.Current7,
          this.Current8,
          this.Current9,
          this.Current10,
          this.Current11,
          this.Current12
        ];
        newData.expected = [
          this.Expected1,
          this.Expected2,
          this.Expected3,
          this.Expected4,
          this.Expected5,
          this.Expected6,
          this.Expected7,
          this.Expected8,
          this.Expected9,
          this.Expected10,
          this.Expected11,
          this.Expected12
        ];
      }else {
        newData.current = [
          this.Current1,
          this.Current2,
          this.Current3
        ];
        newData.expected = [
          this.Expected1,
          this.Expected2,
          this.Expected3
        ];
      }
      this.handleUpdateClick(this.analytic.projectId,newData.id, newData);
    }
  }
}
</script>
<template>
  <section
      class="modal-background w-full bg-white-alpha-40 absolute top-0 left-0 bottom-0 right-0 flex align-items-center justify-content-center">
    <div v-if="selectedCard === 'payments'" class="modal z-1 p-5 border-round-2xl shadow-2">
      <div class="flex flex-row justify-content-between mb-4 align-items-center">
        <p class="text-xl font-medium">You are editing on <span class="text-green-700">Amounts</span></p>
        <i class="pi pi-times cursor-pointer shadow-2 border-gray-600
          bg-white border-round mb-1 hover:bg-green-700
          hover:text-white transition-all transition-duration-300 animation-ease-in"
           @click="closeModal()"
           style="font-size: 1.2rem; padding: 5px"></i>
      </div>
      <div class="flex flex-column gap-3 align-items-center relative mt-0 w-full">
        <form class="flex flex-column align-items-center w-full" @submit.prevent="onUpdate()">
          <div class="flex flex-column w-full gap-4">
            <div class="flex flex-column">
              <p class="mb-3">Transport Vehicles:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current Costs:</label>
                  <input type="number" class="w-3rem" v-model="Current1"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Expected Costs:</label>
                  <input type="number" class="w-3rem" v-model="Expected1"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <p class="mb-3">Food Ammount:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current:</label>
                  <input type="number" class="w-3rem" v-model="Current2"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Required:</label>
                  <input type="number" class="w-3rem" v-model="Expected2"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <p class="mb-3">People Assisting:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current:</label>
                  <input type="number" class="w-3rem" v-model="Current3"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Expected:</label>
                  <input type="number" class="w-3rem" v-model="Expected3"/>
                </div>
              </div>
            </div>
          </div>
          <div class="my-6 flex">
            <p>In this section you can edit the aspects relating to the amount of vehicles and food required and the current and expected assistants</p>
          </div>
          <div class="flex flex-row align-items-center justify-content-center flex-wrap gap-5">
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #bfd6aa !important;"></div>
              <p>Current</p>
            </div>
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #6b9c3c !important;"></div>
              <p>Expected</p>
            </div>
          </div>
          <button class="mt-5 align-self-center shadow-1 border-1 border-gray-300 uppercase py-2 px-5
          font-medium text-base cursor-pointer border-round-2xl
          hover:bg-green-700 hover:text-white transition-duration-200 transition-all animation-ease-in"
                  style="letter-spacing: 1px; justify-self: center">
            update
          </button>
        </form>
      </div>
    </div>
    <div v-if="selectedCard === 'progress'" class="modal-progress z-5 p-5 border-round-2xl shadow-2">
      <div class="flex flex-row justify-content-between mb-4 align-items-center">
        <p class="text-xl font-medium">You are editing on <span class="text-green-700">Monthly Income Projection</span></p>
        <i class="pi pi-times cursor-pointer shadow-2 border-gray-600
          bg-white border-round mb-1 hover:bg-green-700
          hover:text-white transition-all transition-duration-300 animation-ease-in"
           @click="closeModal()"
           style="font-size: 1.2rem; padding: 5px"></i>
      </div>
      <div class="flex flex-column gap-3 align-items-center relative mt-0 w-full">
        <form class="flex flex-column align-items-center w-full" @submit.prevent="onUpdate()">
          <p class="font-medium w-full mb-3 text-green-700">Current - Months:</p>
          <div class="flex flex-column w-full gap-3">
            <div class="flex flex-column">
              <div class="flex flex-row justify-content-between">
                <div class="flex flex-row gap-2">
                  <label>Jan</label>
                  <input type="number" class="w-3rem" v-model="Current1"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Feb</label>
                  <input type="number" class="w-3rem" v-model="Current2"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Mar</label>
                  <input type="number" class="w-3rem" v-model="Current3"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Apr</label>
                  <input type="number" class="w-3rem" v-model="Current4"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>May</label>
                  <input type="number" class="w-3rem" v-model="Current5"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Jun</label>
                  <input type="number" class="w-3rem" v-model="Current6"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <div class="flex flex-row justify-content-between">
                <div class="flex flex-row gap-2">
                  <label>Jul</label>
                  <input type="number" class="w-3rem" v-model="Current7"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Aug</label>
                  <input type="number" class="w-3rem" v-model="Current8"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Sep</label>
                  <input type="number" class="w-3rem" v-model="Current9"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Oct</label>
                  <input type="number" class="w-3rem" v-model="Current10"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Nov</label>
                  <input type="number" class="w-3rem" v-model="Current11"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Dec</label>
                  <input type="number" class="w-3rem" v-model="Current12"/>
                </div>
              </div>
            </div>
          </div>
          <p class="font-medium w-full mt-5 mb-3 text-green-700">Expected - Months:</p>
          <div class="flex flex-column w-full gap-3">
            <div class="flex flex-column">
              <div class="flex flex-row justify-content-between">
                <div class="flex flex-row gap-2">
                  <label>Jan</label>
                  <input type="number" class="w-3rem" v-model="Expected1"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Feb</label>
                  <input type="number" class="w-3rem" v-model="Expected2"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Mar</label>
                  <input type="number" class="w-3rem" v-model="Expected3"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Apr</label>
                  <input type="number" class="w-3rem" v-model="Expected4"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>May</label>
                  <input type="number" class="w-3rem" v-model="Expected5"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Jun</label>
                  <input type="number" class="w-3rem" v-model="Expected6"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <div class="flex flex-row justify-content-between">
                <div class="flex flex-row gap-2">
                  <label>Jul</label>
                  <input type="number" class="w-3rem" v-model="Expected7"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Aug</label>
                  <input type="number" class="w-3rem" v-model="Expected8"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Sep</label>
                  <input type="number" class="w-3rem" v-model="Expected9"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Oct</label>
                  <input type="number" class="w-3rem" v-model="Expected10"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Nov</label>
                  <input type="number" class="w-3rem" v-model="Expected11"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label>Dec</label>
                  <input type="number" class="w-3rem" v-model="Expected12"/>
                </div>
              </div>
            </div>
          </div>
          <div class="flex" style="margin: 35px 0">
            <img src="../../../assets/image-progress-months(1).png" class="w-full sm:w-30rem h-full" alt="chart progress"/>
          </div>
          <div class="flex flex-row align-items-center justify-content-center flex-wrap gap-5">
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #bfd6aa !important;"></div>
              <p>Current</p>
            </div>
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #6b9c3c !important;"></div>
              <p>Expected</p>
            </div>
          </div>
          <button class="mt-5 align-self-center shadow-1 border-1 border-gray-300 uppercase py-2 px-5
          font-medium text-base cursor-pointer border-round-2xl
          hover:bg-green-700 hover:text-white transition-duration-200 transition-all animation-ease-in"
                  style="letter-spacing: 1px; justify-self: center">
            update
          </button>
        </form>
      </div>
    </div>
    <div v-if="selectedCard === 'statistics'" class="modal z-5 p-5 border-round-2xl shadow-2">
      <div class="flex flex-row justify-content-between mb-4 align-items-center">
        <p class="text-xl font-medium">You are editing on <span class="text-green-700">Budget Planning</span></p>
        <i class="pi pi-times cursor-pointer shadow-2 border-gray-600
          bg-white border-round mb-1 hover:bg-green-700
          hover:text-white transition-all transition-duration-300 animation-ease-in"
           @click="closeModal()"
           style="font-size: 1.2rem; padding: 5px"></i>
      </div>
      <div class="flex flex-column gap-3 align-items-center relative mt-0 w-full">
        <form class="flex flex-column align-items-center w-full" @submit.prevent="onUpdate()">
          <div class="flex flex-column w-full gap-4">
            <div class="flex flex-column">
              <p class="mb-3">Expenses:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current:</label>
                  <input type="number" class="w-3rem" v-model="Current1"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Expected:</label>
                  <input type="number" class="w-3rem" v-model="Expected1"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <p class="mb-3">Budget:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current:</label>
                  <input type="number" class="w-3rem" v-model="Current2"/>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Expected:</label>
                  <input type="number" class="w-3rem" v-model="Expected2"/>
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <p class="mb-3">Over/Under:</p>
              <div class="label-container flex flex-row justify-content-between w-full px-5 flex-wrap gap-3">
                <div class="flex flex-row gap-2">
                  <label class="font-light">Current:</label>
                  <p class="w-3rem">{{Current3}}</p>
                </div>
                <div class="flex flex-row gap-2">
                  <label class="font-light">Expected:</label>
                  <p class="w-3rem">{{Expected3}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="my-6 flex">
            <img src="../../../assets/image-progressbar.png" class="w-full sm:w-26rem h-full" alt="chart progress bar"/>
          </div>
          <div class="flex flex-row align-items-center justify-content-center flex-wrap gap-5">
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #bfd6aa !important;"></div>
              <p>Current</p>
            </div>
            <div class="flex flex-row align-items-center gap-2">
              <div class="w-3rem h-1rem" style="background-color: #6b9c3c !important;"></div>
              <p>Expected</p>
            </div>
          </div>
          <button class="mt-5 align-self-center shadow-1 border-1 border-gray-300 uppercase py-2 px-5
          font-medium text-base cursor-pointer border-round-2xl
          hover:bg-green-700 hover:text-white transition-duration-200 transition-all animation-ease-in"
                  style="letter-spacing: 1px; justify-self: center">
            update
          </button>
        </form>
      </div>
    </div>
  </section>
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="hasUpdated" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-check-circle text-green-700"></i>
      <h1>Update Successful!</h1>
      <p class="text-md">The data has been successfully updated</p>
      <pv-button class="py-3 px-5" label="OK" @click="hasUpdated = false"/>
    </div>
  </pv-dialog>
</template>

<style scoped>

.modal-background {
  backdrop-filter: blur(1px);
  min-height: inherit;
}

.modal-background::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15); /* Ajusta la opacidad según tus necesidades */
}

.modal {
  width: 95%;
  margin-inline: auto;
  max-width: 500px;
  background-color: #E6F4E2;
  padding: 20px 0;
  max-height: 100%;
  z-index: 5;
}

.modal-progress {
  width: 95%;
  margin-inline: auto;
  max-width: 650px;
  background-color: #E6F4E2;
  padding: 50px;
  max-height: 100%;
}

.modal-progress label {
  width: 2rem;
}

.modal input {
  text-indent: 5px;
}

@media (max-width: 499px) {

  .stats-label {
    width: 7rem !important;
  }

  .label-container {
    padding: 0 !important;
  }

}

</style>
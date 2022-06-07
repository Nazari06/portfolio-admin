<template>
  <div class="row">
    <form @submit.prevent="addToPortfolio" novalidate>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"> Title:</label>
              <div class="col-sm-12 col-md-7">
                <input class="form-control" :class="[!v$.form.title.$errors ? 'is-invalid':'form-control']" placeholder="Enter Title (Require)" type="text" v-model="v$.form.title.$model">
                <!-- Error Message -->
                <div class="input-errors" v-for="(error, index) of v$.form.title.$errors" :key="index">
                  <div class="error-msg text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"> Start Date:</label>
              <div class="col-sm-12 col-md-7">
                <input class="form-control datepicker" :class="[!v$.form.start_date.$errors ? 'is-invalid':'form-control']" placeholder="Enter Title (Require)" type="date" v-model="v$.form.start_date.$model">
                <!-- Error Message -->
                <div class="input-errors" v-for="(error, index) of v$.form.start_date.$errors" :key="index">
                  <div class="error-msg text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"> End Date:</label>
              <div class="col-sm-12 col-md-7">
                <input type="date" class="form-control datepicker" :class="[!v$.form.end_date.$errors ? 'is-invalid':'form-control']" placeholder="Enter Title (Require)" v-model="v$.form.end_date.$model">
                <!-- Error Message -->
                <div class="input-errors" v-for="(error, index) of v$.form.end_date.$errors" :key="index">
                  <div class="error-msg text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Descibe Your Project:</label>
              <div class="col-sm-12 col-md-7">
                <textarea
                  class="form-control" v-model="form.description"
                  placeholder="Write about your project (Optional)"
                  cols="30"
                  rows="7"
                  name="projectDescription"
                ></textarea>
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"> Start Date:</label>
              <div class="col-sm-12 col-md-7">
              <div class="row">
                  <div class="col-sm-7">
                    <input type="file" name="image" class="form-control"  v-on:change="getImagePath"/>
                    <HasError :form="form" field="image" />
                  </div>
                  <div class="col-sm-4">
                    <img :src="form.imagePath" alt="" class="img img-rounded w-100 cover">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-4">
              <label
                class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
              ></label>
              <div class="col-sm-12 col-md-7">
                <button class="btn btn-primary" :disabled="v$.form.$invalid">
                <i class="ion ion-checkmark-round mr-2"></i>Save</button>
              </div>
            </div>
          </form>
  </div>
</template>

<script>
import Form from 'vform'
import useVuelidate from '@vuelidate/core'
import { required, minLength,maxLength } from '@vuelidate/validators'
// import { reactive, computed } from 'vue'; 
import axios from'axios';
import Swal from 'sweetalert2';

export default {
  name: "AddPortfolio",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
     form: new Form({
      title: '',
      start_date: '',
      end_date:'',
      description:'',
      image:'',
      imagePath:'',
    }),
    errors:{},
    }
  },
  
   validations() {
    return {
      form: {
        title: { 
          required,
          String,
          min: minLength(10),
          max:maxLength(100),
          $message: 'Title is require'
        },
        start_date: { 
          required,
          $message:'Start Date is require'
        },
        end_date: { 
          required,
          $message:'End Date is require'
        },
        // image: {
        //   required,
        //   $message:'Image is require'
        // },
      },
    }
  },
    // start custom function
    invalidEndDate (){
      if(this.form.start_date > this.form.end_date)
      {
        this.inValidEndDate = true;
      }
    },
  // end custom function
  methods: {
    getImagePath(e){
      const file = e.target.files[0];
      const url = 'http://localhost:8000/api/portfolio_image_path';
      const form = new FormData();
      form.append('image',file);
      axios.post(url,form).then((response) =>{
        console.log(response.data);
        this.form.imagePath = response.data;
        this.form.image = response.data;
      });
    },
    addToPortfolio(){
      this.v$.$validate();
      // const result = await this.v$.$validate()
      if(!this.v$.$error){
        const url = 'http://localhost:8000/api/save_project';
        this.form.loading=true;
        axios.post(url,this.form).then((response)=>{
          // console.log(response);
          if (response.status == 200) {
            this.form.reset();
            Swal.fire({
              title:response.data.message,
              toast: true,
              icon:'success',
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          }
          if(response.errors){
            console.log(response.errors.data);
            this.errors = response.errors.data;
          }
        }).catch(()=>{
          // console.log(e.response.data.error);
          Swal.fire({
              title:'Oops! an error occurred, please insert valid data.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              icon:'error',
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
        });
        
      }else{
        Swal.fire({
          title: 'Error',
          text:'An error occurred!',
          icon:'error',
          toast:true,
          position:'top-end',
          timer:3000,
        })
      }
  }
  },
  
};
</script>
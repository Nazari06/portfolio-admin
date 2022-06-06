<template>
  <div class="row">
    <form @submit.prevent="addToPortfolio">
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                >Title</label
              >
              <div class="col-sm-12 col-md-7">
                <input
                  type="text" v-model="form.title"
                  class="form-control"
                  placeholder="Project Title (required)"
                  name="projectTitle"
                />
                <!-- <span class="text-danger" v-if="$v.title.required">Title is required.</span> -->
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                >Date Start:</label
              >
              <div class="col-sm-12 col-md-7">
                <input
                  type="date"  v-model="form.start_date"
                  placeholder="Start Date (required)"
                  name="startDate"
                  class="form-control"
                />
                <HasError :form="form" field="startDate" />
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                >Date End:</label
              >
              <div class="col-sm-12 col-md-7">
                <input
                  type="date"  v-model="form.end_date"
                  placeholder="End Date (required)"
                  name="endDate"
                  class="form-control"
                />
                <HasError :form="form" field="endDate" />
              </div>
            </div>
            <div class="form-group row mb-4">
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                >Descibe Your Project:</label
              >
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
              <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                >Project Image:</label
              >
              <div class="custom-file col-sm-12 col-md-7">
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
                <button class="btn btn-primary" :form="project">
                <i class="ion ion-checkmark-round mr-2"></i>
                <i class="fa fa-spin fa-spinner mr-2"></i>Save</button>
              </div>
            </div>
          </form>
  </div>
</template>

<script>
import Form from 'vform'
import useVuelidate from '@vuelidate/core'
import {required, minLength, maxLength} from '@vuelidate/validators';
// import { reactive, computed } from 'vue'; 
import axios from'axios';
import Swal from 'sweetalert2';

export default {
  name: "AddPortfolio",
  components: {
  },
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
      loading:false,
      inValidEndDate:false,
    }),
    errors:{},
    }
  },
  
   validations:{
        // expenses validation
        title :{
            required,
            String,
            minLength: minLength(5),
            maxLength: maxLength(100)
        },
        start_date :{
            required,
            Date,
        },
        end_date :{
            required,
            Date,
        },
        description :{
            minLength: minLength(2),
            maxLength: maxLength(500)
        },
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
      this.errors = {};
      // const result = await this.v$.$validate()
      if(!this.v$.$validate()){
        console.log('error');
        Swal.fire({
          title:'Error',
          icon:'error',
          toast:true,
          position:'top-end',
          timer:3000,
        })
      }else{
        console.log('not valid form');
    // const url = 'http://localhost:8000/api/save_project';
    // this.form.loading=true;
    // axios.post(url,this.form).then((response)=>{
    //   // console.log(response.errors);
    //   if(response.status ==200){
    //     this.form.loading=false;
    //     Swal.fire({
    //       title:response.data.message,
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       }
    //   })
    //   }
    //   if(response.errors){
    //     console.log(response.errors.data);
    //     this.errors = response.errors.data;
    //   }
    // }).catch(()=>{
    //   // console.log(e.response.data.error);
    //    Swal.fire({
    //       title:'Oops! an error accurse, please insert valid data.',
    //       toast: true,
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 4000,
    //       timerProgressBar: true,
    //       icon:'error',
    //       didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       }
    //   })
    // });
      }
  }
  },
  
};
</script>
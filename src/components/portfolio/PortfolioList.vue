<template>
  <div class="table-responsive">
    <div id="table-2_wrapper"
      class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="dataTables_length" id="table-2_length">
            <label>Show
              <select
                name="table-2_length"
                aria-controls="table-2"
                class="form-control form-control-sm">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              entries</label
            >
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <div id="table-2_filter" class="dataTables_filter">
            <label>Search:
                <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="table-2" />
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <table
            class="table table-striped dataTable no-footer"
            id="table-2"
            role="grid"
            aria-describedby="table-2_info"
          >
            <thead>
              <tr role="row">
                <th
                  class="text-center pt-3 sorting_disabled"
                  rowspan="1"
                  colspan="1"
                  aria-label="&amp;nbsp;"
                  style="width: 27.5312px">
                  <div class="custom-checkbox custom-checkbox-table custom-control">
                    <input type="checkbox"
                      data-checkboxes="mygroup"
                      data-checkbox-role="dad"
                      class="custom-control-input"
                      id="checkbox-all"/>
                    <label for="checkbox-all" class="custom-control-label">&nbsp;</label
                    >
                  </div>
                </th>
                <th
                  class="sorting_asc"
                  tabindex="0"
                  aria-controls="table-2"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Task Name: activate to sort column descending"
                  style="width: 76.8594px"
                >
                  Title
                </th>
                <th
                  class="sorting_disabled"
                  rowspan="1"
                  colspan="1"
                  aria-label="Progress"
                  style="width: 53.0156px"
                >
                  Description
                </th>
                <th
                  class="sorting_disabled"
                  rowspan="1"
                  colspan="1"
                  aria-label="Members"
                  style="width: 110.031px"
                >
                  Image
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="table-2"
                  rowspan="1"
                  colspan="1"
                  aria-label="Due Date: activate to sort column ascending"
                  style="width: 44.5625px"
                >
                  Start at
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="table-2"
                  rowspan="1"
                  colspan="1"
                  aria-label="Status: activate to sort column ascending"
                  style="width: 70.6562px"
                >
                  End at
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="table-2"
                  rowspan="1"
                  colspan="1"
                  aria-label="Action: activate to sort column ascending"
                  style="width: 44.3438px"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr role="row" class="odd" v-for="(portfolio,index) in portfolios" :key="index">
                <td class="text-center pt-2">
                  <div class="custom-checkbox custom-control">
                    <input
                      type="checkbox"
                      data-checkboxes="mygroup"
                      class="custom-control-input"
                      id="checkbox-3"
                    />
                    <label for="checkbox-3" class="custom-control-label"
                      >&nbsp;</label>
                  </div>
                </td>
                <td class="sorting_1">{{ portfolio.title }}</td>
                <td>
                  <img :alt="portfolio.title " :src="portfolio.image" width="35" class="image image-rounded"/>
                </td>
                <td>2018-01-29</td>
                <td>
                  <div class="badge badge-info badge-shadow">
                    {{ portfolio.start_date }}
                  </div>
                </td>
                <td>
                  <div class="badge badge-info badge-shadow">
                    {{ portfolio.end_date }}
                  </div>
                </td>
                <td>
                  <button class="btn btn-warning btn-sm btn-rounded">
                    <i class="ion ion-compose"></i>
                  </button>
                  <button class="btn btn-danger ml-2 btn-sm btn-rounded" @click="onDelete(portfolio.id)">
                    <i class="ion ion-trash-b"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-5">
          <div
            class="dataTables_info"
            id="table-2_info"
            role="status"
            aria-live="polite"
          >
            Showing 1 to 4 of 4 entries
          </div>
        </div>
        <div class="col-sm-12 col-md-7">
          <div
            class="dataTables_paginate paging_simple_numbers"
            id="table-2_paginate"
          >
            <ul class="pagination">
              <li
                class="paginate_button page-item previous disabled"
                id="table-2_previous"
              >
                <a
                  href="#"
                  aria-controls="table-2"
                  data-dt-idx="0"
                  tabindex="0"
                  class="page-link"
                  >Previous</a
                >
              </li>
              <li class="paginate_button page-item active">
                <a
                  href="#"
                  aria-controls="table-2"
                  data-dt-idx="1"
                  tabindex="0"
                  class="page-link"
                  >1</a
                >
              </li>
              <li
                class="paginate_button page-item next disabled"
                id="table-2_next"
              >
                <a
                  href="#"
                  aria-controls="table-2"
                  data-dt-idx="2"
                  tabindex="0"
                  class="page-link"
                  >Next</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2";
export default {
  name: "PortfolioList",
  data() {
    return {
      portfolios:[]
    }
  },
  mounted() {
    this.getPortfolio();
  },
  methods: {
    getPortfolio(){
      const url = 'http://localhost:8000/api/get_portfolio';
      axios.get(url).then((response)=>{
        console.log(response.data);
        this.portfolios= response.data;
      });
    },
    onDelete(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:8000/api/delete_portfolio/${id}`;
      axios.delete(url).then((response)=>{
        if(response.status ==200){
          Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
                confirmButton: false,
                timer:4000,
                timerProgressBar:true,
                showConfirmButton:false,
              })
        this.getPortfolio();
        console.log(response.data);
        }
        if(response.status == 500)
        {
          Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
        }
      });
        
      }
    })
      
    }
  },
};
</script>

<style>
</style>
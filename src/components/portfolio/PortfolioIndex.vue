<template>
<div>
  <div class="col-12 col-sm-12 col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4>Add to your portfolio</h4>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Add new
        </button>
         <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs" id="myTab2" role="tablist">
          <li class="nav-item">
            <a class="nav-link active"
              id="home-tab2"
              data-toggle="tab"
              href="#home2"
              role="tab"
              aria-controls="home"
              aria-selected="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3" y2="6"></line>
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="3" y1="18" x2="3" y2="18"></line>
              </svg>
              Portfolio List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
              id="profile-tab2"
              data-toggle="tab"
              href="#addNew"
              role="tab"
              aria-controls="profile"
              aria-selected="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Add New</a>
          </li>
        </ul>
        <div class="tab-content tab-bordered" id="myTab3Content">
          <div class="tab-pane fade active show" id="home2" role="tabpanel"
            aria-labelledby="home-tab2">
            <PortfolioList/>
          </div>
          <div class="tab-pane fade" id="addNew"
            role="tabpanel"
            aria-labelledby="profile-tab2">
                <AddPortfolio/>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>
</template>

<script>
import AddPortfolio from './AddPortfolio.vue';
import PortfolioList from './PortfolioList.vue';
export default {
    components:{
    AddPortfolio,
    PortfolioList
}
};
</script>

<style scoped>
li>a.active{
    border-top:3px solid #6777ef !important;
}

.card-header{
  display: flex;
}
</style>
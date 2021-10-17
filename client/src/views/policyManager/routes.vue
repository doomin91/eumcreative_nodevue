<template>
  <div class="content">


      <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
      </div>

      <el-form ref="form" :model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
          <div class="block-header">
            <h3 class="block-title">라우트</h3>
          </div>
            <div class="block-content">
              
                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            방화벽
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col><el-select></el-select></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            서비스
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6"><el-select></el-select></el-col>
                              <el-col :span="18"><el-input type="text"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            출발지 Zone
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6"><el-select></el-select></el-col>
                              <el-col :span="18"><el-input type="text"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            목적지 Zone
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6"><el-select></el-select></el-col>
                              <el-col :span="18"><el-input type="text"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                
                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            출발지 
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6"><el-select></el-select></el-col>
                              <el-col :span="18"><el-input type="text"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            목적지 
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6"><el-select></el-select></el-col>
                              <el-col :span="18"><el-input type="text"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                
                <el-row class="mb20 pw20">
                    <el-col align="right" :span="24">
                        <el-button type="primary">검색</el-button>
                    </el-col>
                </el-row>


            </div>
        </div>
      </el-form>

      <div class="blockbase block-rounded">
          <div class="block-content">

            <el-table :data="pagedTableData" >
              <el-table-column label="#" >
                <template slot-scope="scope">
                  <span>{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="방화벽">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="정책순서">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="정책번호">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="출발지 Zone">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="목적지 Zone">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="출발지">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="목적지">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="설명">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="관련신청서">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>

              <el-table-column label="아이디">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="관련정책">
                <template slot-scope="scope">
                  <el-button size="mini" type="default" @click="viewDetail(scope.row)">수정</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination class="mt-4" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
            </el-pagination>



          </div>
      </div>


  </div>
</template>

<style>
  .UserListForm .el-input {
    width:220px !important;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table th>.cell {
    text-align:center;
  }
.el-table__row .cell {
  text-align:center;
}
</style>



<script>

  import Breadcrumb from '../../components/Breadcrumb/index'


  export default {
    data() {
      return {
        items: [],
      }
    },
    computed: {
     pagedTableData() {
       return this.items.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
   components: {
      Breadcrumb
   },
    methods: {
      setPage (val) {
        this.page = val
      },
      getDataLoad() {
      }
    },
    created() {
      this.getDataLoad();
    }

  }
</script>
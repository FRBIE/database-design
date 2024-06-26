<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import Project from "@/components/views/Project.vue";
import {extractDateFormat} from "element-plus";

interface Project {
  projectID: string
  projectName: string
  projectLevel: string
  managerID: string
  managerName: string
  startDate: Date
  budget: string
}
const loading = ref(false) //动态效果-加载动画

// 定义一个 ref 来存储项目列表数据
let projectList = ref([]);

// 定义获取项目列表的函数
const getProjectList = async () => {
  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.get('/project/list');
    // 更新项目列表数据，使用 .value 来访问 ref 的值
    projectList.value = response.data.data;
  } catch (error) {
    console.error('获取项目列表数据时出错:', error);
  }
};
const deleteProject= async (id) =>{
  try {
    const response = await axios.post('/project/delete',{
      id
    });
    getProjectList();
  }catch (error){
    console.log('删除项目出错:',error);
  }
}


const editFormVisible = ref(false)
const addFormVisible = ref(false)
const form = ref(Project);
const formLabelWidth = '140px'
const handleEdit = ( row: Project) => {
  editFormVisible.value = true;
  Object.assign(form.value, row);

}
const handleAdd = () => {
  form.value = {
    projectID: '',
    projectName: '',
    projectLevel: '',
    managerName: '',
    startDate: '',
    budget: ''
  };
  addFormVisible.value = true;
}
const handleDelete = async (row: Project) => {
  try {
    // 发起异步请求获取项目列表数据
    const response =  await axios.post('/project/delete', {
      id: row.projectID
    });
    if(response.data.code === 0){
      getProjectList();
      alert("删除成功")
    }
  } catch (error) {
    alert('删除失败，请重试');
  }
}

const  editProject = async (form: Project) => {

  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.post('/project/edit', form);
    if(response.data.code === 0){
      getProjectList();
      alert("修改成功")
      editFormVisible.value = false;
    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('修改失败，请重试');
  }
}
const addProject = async (form: Project) => {
  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.post('/project/add', form);
    if(response.data.code === 0){
      getProjectList();
      alert("添加成功")
      addFormVisible.value = false;
    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('添加失败，请重试');
  }
}
const searchParams = reactive({
  projectID: '',
  projectName: '',
  projectLevel: '',
  managerName: '',
  startDate: '',
  budget: ''
})
const search = async (searchParams: Project) => {
  loading.value = true;
  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.post('/project/search', searchParams);
    if(response.data.code === 0){
      projectList.value = response.data.data;

    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('搜索失败，请重试');
  }
  loading.value = false;
}
const resetSearch = async () =>{
  searchParams.projectID = "";
  searchParams.projectName = "";
  searchParams.projectLevel = "";
  searchParams.managerName = "";
  searchParams.startDate = "";
  searchParams.budget = "";
  getProjectList();
}
onMounted(() => {
  getProjectList();
});
</script>

<template>
  <div class="common-layout">
    <el-container>
        <el-header>

          <el-form :inline="true" :model="searchParams" class="demo-form-inline" >
            <el-form-item label="项目ID">
              <el-input v-model="searchParams.projectID" placeholder="项目ID" clearable />
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="searchParams.projectName" placeholder="项目名称" clearable />
            </el-form-item>
            <el-form-item label="项目级别">
              <el-input v-model="searchParams.projectLevel" placeholder="项目级别" clearable />
            </el-form-item>
            <el-form-item label="负责人姓名">
              <el-input v-model="searchParams.managerName" placeholder="负责人姓名" clearable />
            </el-form-item>
            <el-form-item label="立项日期">
              <el-date-picker
                  v-model="searchParams.startDate"
                  type="date"
                  placeholder="请选择立项日期"
                  clearable
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="预算(元)">
              <el-input type="number" v-model="searchParams.budget" autocomplete="on" placeholder="请输入金额，如1000.8" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search(searchParams)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>

      </el-header>
      <br>
      <br>
      <el-main>

        <el-table :data="projectList" style="width: 100%" v-loading="loading">
          <el-table-column prop="projectID" label="项目ID" width="180" />
          <el-table-column prop="projectName" label="项目名称" width="180" />
          <el-table-column prop="projectLevel" label="项目级别" width="180" />
          <el-table-column prop="managerName" label="负责人姓名" width="180" />
          <el-table-column prop="startDate" label="立项日期" width="180" />
          <el-table-column prop="budget" label="预算(元)" width="180" />
          <el-table-column align="right">

            <template #header>
              <el-button size="small" type="success" @click="handleAdd">
                添加项目
              </el-button>
            </template>
            <template #default="scope">
              <el-button size="small"  type="info" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-dialog v-model="addFormVisible" title="增加项目" width="500">
          <el-form :model="form">
<!--            <el-form-item label="项目ID" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.projectID" autocomplete="on" />-->
<!--            </el-form-item>-->
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.projectName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目级别" :label-width="formLabelWidth">
              <el-input v-model="form.projectLevel" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人姓名" :label-width="formLabelWidth">
              <el-input v-model="form.managerName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="立项日期" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="请选择立项日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="预算(元)" :label-width="formLabelWidth">
              <el-input type="number" v-model="form.budget" autocomplete="on" placeholder="请输入金额，如1000.8" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click="addProject(form)">
                确认添加
              </el-button>
            </div>
          </template>
        </el-dialog>



        <el-dialog v-model="editFormVisible" title="项目信息修改" width="500">
          <el-form :model="form">
            <el-form-item label="项目ID" :label-width="formLabelWidth">
              <el-input v-model="form.projectID" autocomplete="on" :disabled="true"/>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.projectName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目级别" :label-width="formLabelWidth">
              <el-input v-model="form.projectLevel" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人姓名" :label-width="formLabelWidth">
              <el-input v-model="form.managerName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="立项日期" :label-width="formLabelWidth">
              <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="请选择立项日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="预算(元)" :label-width="formLabelWidth">
              <el-input type="number" v-model="form.budget" autocomplete="on" placeholder="请输入金额，如1000.8" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click="editProject(form)">
                确认修改
              </el-button>
            </div>
          </template>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>
